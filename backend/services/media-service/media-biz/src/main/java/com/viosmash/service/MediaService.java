package com.viosmash.service;

import com.viosmash.controller.vo.MediaReqVO;
import com.viosmash.controller.vo.UploadRespVO;
import com.viosmash.dal.dataobject.Media;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

public interface MediaService {
    default Mono<List<UploadRespVO>> uploads(Flux<MultipartFile> filePartFlux) {
        return filePartFlux.flatMap(filePart -> upload(filePart))
                .collectList();
    };

    Mono<UploadRespVO> upload(MultipartFile file);

    Mono<List<Media>> save(List<MediaReqVO> listReq);

    Mono<Map> deleteMedia(String id);
    Flux<Media> getListMedia(String type, String typeId);

    Flux<UploadRespVO> getListUploaded(Long loginUserMemberId);
}
