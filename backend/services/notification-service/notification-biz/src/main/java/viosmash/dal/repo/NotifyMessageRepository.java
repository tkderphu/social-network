package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import viosmash.dal.dataobject.NotifyMessage;

public interface NotifyMessageRepository extends MongoRepository<NotifyMessage, Long> {
    Page<NotifyMessage> findAllByUserId(Long userId, Pageable pageable);
}
