package com.viosmash.controller;

import com.viosmash.controller.vo.MediaReqVO;
import com.viosmash.controller.vo.UploadRespVO;
import com.viosmash.dal.dataobject.Media;
import com.viosmash.security.SecurityUtils;
import com.viosmash.service.MediaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;


@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/medias")
public class MediaController {

    private final MediaService mediaService;


    @PostMapping(path = "/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<UploadRespVO> upload(@RequestPart("file")FilePart file) {
        log.info("receive request upload");
        return SecurityUtils.getLoginUserMemberId()
                .flatMap(userId -> mediaService.upload(file, userId));
//        return mediaService.upload(file);
    }

    @PostMapping(value = "/uploads/multiples", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<List<UploadRespVO>> uploads(@RequestParam("files") Flux<FilePart> filePartFlux) {
        return null;
    }

    @GetMapping("/uploads")
    public Flux<UploadRespVO> getListUploaded() {
        return SecurityUtils.getLoginUserMemberId()
                .flatMapMany(userId -> mediaService.getListUploaded(userId));
    }

    @GetMapping("/{type}/{typeId}")
    public Flux<Media> getListMedia(@PathVariable("type") String type,
                                    @PathVariable("typeId") String typeId) {
        return SecurityUtils.getLoginUserMemberId()
                .flatMapMany(user -> mediaService.getListMedia(type, typeId));
    }

    @PostMapping
    public Flux<Media> save(@RequestBody Flux<MediaReqVO> listReq) {
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
