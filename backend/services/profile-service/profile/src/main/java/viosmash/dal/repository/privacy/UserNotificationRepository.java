package viosmash.dal.repository.privacy;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.privacy.UserNotification;

public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {
}
