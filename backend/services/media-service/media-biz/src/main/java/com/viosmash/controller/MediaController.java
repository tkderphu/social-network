package com.viosmash.controller;

import com.viosmash.cloudinary.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/uploads")
public class MediaController {

    private final CloudinaryService cloudinaryService;


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<String> upload(@RequestPart("file") Mono<FilePart> filePartMono) {
        return filePartMono.flatMap(cloudinaryService::upload);
    }

    @PostMapping(value = "/multiples", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<List<String>> uploads(@RequestPart("files") Flux<FilePart> filePartFlux) {
        return cloudinaryService.uploads(filePartFlux);
    }
    @GetMapping("/test")
    public Mono<List<String>> test() throws InterruptedException {
        Mono<List<String>> test = cloudinaryService.test();
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
