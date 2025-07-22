package com.viosmash.service;

import com.viosmash.controller.vo.MediaReqVO;
import com.viosmash.controller.vo.UploadRespVO;
import com.viosmash.dal.dataobject.Media;
import com.viosmash.dal.repository.MediaRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.StreamUtils;
import org.springframework.web.reactive.function.BodyInserters;
import viosmash.BaseTest;
import viosmash.random.RandomUtils;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
@Slf4j
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("unit-test")
@AutoConfigureWebTestClient
class MediaServiceTest  {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private ApplicationContext context;



    @org.junit.jupiter.api.Test
    void uploads() {
    }

    @org.junit.jupiter.api.Test
    void upload() throws IOException {
        // Load the test image from resources
        ClassPathResource imageResource = new ClassPathResource("role1.png");
        byte[] imageBytes = StreamUtils.copyToByteArray(imageResource.getInputStream());

        // Prepare multipart form data
        LinkedMultiValueMap<String, Object> multipartData = new LinkedMultiValueMap<>();
        multipartData.add("file", new ByteArrayResource(imageBytes) {
            @Override
            public String getFilename() {
                return "test-image.jpg";
            }
        });

        UploadRespVO responseBody = webTestClient.post()
                .uri("/api/medias/uploads")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(multipartData))
                .exchange()
                .expectStatus().isOk()
                .expectBody(UploadRespVO.class)
                .returnResult()
                .getResponseBody();

        MediaReqVO mediaReqVO = new MediaReqVO();

        mediaReqVO.setId(responseBody.getPublicId());
        mediaReqVO.setUrl(responseBody.getUrl());
        mediaReqVO.setFileType(responseBody.getFileType());

        mediaReqVO.setType("POST");
        mediaReqVO.setTypeId("1");

        List resp = webTestClient.post()
                .uri("/api/medias")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(List.of(mediaReqVO))
                .exchange()
                .expectStatus().isOk()
                .expectBody(List.class)
                .returnResult()
                .getResponseBody();

        Assertions.assertEquals(resp.size(), 1);

    }

    @org.junit.jupiter.api.Test
    void save() throws InterruptedException {
        Media media = RandomUtils.randomObject(Media.class);
        media.setId(UUID.randomUUID().toString());

        this.mediaRepository.save(media).block();

        Media block =  mediaRepository
                .findById(media.getId())
                .block();

        Assertions.assertNotNull(block);

    }

    @org.junit.jupiter.api.Test
    void deleteMedia() {
    }

    @org.junit.jupiter.api.Test
    void getListMedia() {
    }
}