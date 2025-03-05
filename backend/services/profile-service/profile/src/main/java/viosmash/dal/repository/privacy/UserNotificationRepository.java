package viosmash.dal.repository.privacy;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.privacy.UserNotification;

import java.util.Optional;

public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {
    Optional<UserNotification> findByUserId(Long userId);
}
