package com.viosmash.dal.repository;

import com.viosmash.dal.dataobject.UploadedMedia;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface UploadedMediaRepository extends ReactiveCrudRepository<UploadedMedia, String> {
    Flux<UploadedMedia> findAllByUserId(Long loginUserMemberId);
}
