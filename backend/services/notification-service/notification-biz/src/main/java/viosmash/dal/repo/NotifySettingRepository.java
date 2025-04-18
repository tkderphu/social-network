package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.NotifySetting;

import java.util.Optional;

public interface NotifySettingRepository extends JpaRepository<NotifySetting, Long> {
    Optional<NotifySetting> findByUserId(Long userId);
}
