package viosmash.dal.repo.v1;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.v1.NotificationSetting;

public interface NotificationSettingRepository extends JpaRepository<NotificationSetting, Long> {
}
