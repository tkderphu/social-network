package com.viosmash.service;

import com.viosmash.controller.vo.MediaReqVO;
import com.viosmash.controller.vo.UploadRespVO;
import com.viosmash.dal.dataobject.Media;
import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

public interface MediaService {
    default Mono<List<UploadRespVO>> uploads(Flux<FilePart> filePartFlux, Long userId) {
        return filePartFlux.flatMap(filePart -> upload(filePart, userId))
                .collectList();
    };

    Mono<UploadRespVO> upload(FilePart file, Long userId);

    Mono<List<Media>> save(List<MediaReqVO> listReq);

    Mono<Map> deleteMedia(String id);
    Flux<Media> getListMedia(String type, String typeId);

    Flux<UploadRespVO> getListUploaded(Long loginUserMemberId);
}
