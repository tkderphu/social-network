package com.viosmash.dal.repository;

import com.viosmash.dal.dataobject.Gallery;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface GalleryRepository extends ReactiveCrudRepository<Gallery, String> {
    Mono<Gallery> findByTypeAndTypeId(String type, String typeId);
}
