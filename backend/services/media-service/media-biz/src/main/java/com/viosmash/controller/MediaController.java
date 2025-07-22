package com.viosmash.controller;

import com.viosmash.controller.vo.MediaReqVO;
import com.viosmash.controller.vo.UploadRespVO;
import com.viosmash.dal.dataobject.Media;
import com.viosmash.service.MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import viosmash.core.utils.SecurityUtils;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/medias")
public class MediaController {

    private final MediaService mediaService;


    @PostMapping(path = "/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<UploadRespVO> upload(@RequestParam("file")MultipartFile file) {
        return mediaService.upload(file);
    }

    @PostMapping(value = "/uploads/multiples", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<List<UploadRespVO>> uploads(@RequestParam("files") Flux<FilePart> filePartFlux) {
        return null;
    }

    @GetMapping("/uploads")
    public Flux<UploadRespVO> getListUploaded() {
        return this.mediaService.getListUploaded(SecurityUtils.getLoginUserMemberId());
    }

    @PostMapping
    public Mono<List<Media>> save(@RequestBody List<MediaReqVO> listReq) {
        return mediaService.save(listReq);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> save(@PathVariable("id") String id) {
        return null;
    }

    @GetMapping("/test")
    public Mono<List<String>> test() throws InterruptedException {
        Mono<List<String>> test = null;
        System.out.println("------------------------------------success--------------------");

        return test.doOnNext((data) -> {
            System.out.println("data return : " + data);
        });
//        test.subscribe(
//                value -> {
//                    System.out.println("Data return: " + value);
//                },
//                err -> {},
//                () -> {
//
//                }
//        );

    }
}
