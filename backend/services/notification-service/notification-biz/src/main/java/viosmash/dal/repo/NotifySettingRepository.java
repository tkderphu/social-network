package viosmash.dal.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import viosmash.dal.dataobject.NotifySetting;

import java.util.Optional;

public interface NotifySettingRepository extends MongoRepository<NotifySetting, Long> {
    Optional<NotifySetting> findByUserId(Long userId);
}
