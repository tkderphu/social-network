package viosmash.service.notification;

import viosmash.controller.vo.NotificationSettingReqVO;
import viosmash.dal.dataobject.NotificationSetting;

public interface NotificationSettingService {
    void updateSetting(Long userId, NotificationSettingReqVO req);


    NotificationSetting getNotificationSetting(Long userId);
}
