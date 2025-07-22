package com.viosmash.dal.repository;

import com.viosmash.dal.dataobject.Media;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface MediaRepository extends ReactiveCrudRepository<Media, String> {
    Flux<Media> findAllByGalleryId(String id);
}
