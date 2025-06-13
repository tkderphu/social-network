package viosmash.service.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.controller.vo.NotificationSettingReqVO;
import viosmash.dal.dataobject.NotificationSetting;
import viosmash.dal.repo.NotificationSettingRepository;
import viosmash.object.BeanUtil;

@Service
@RequiredArgsConstructor
public class NotificationSettingServiceImpl implements NotificationSettingService{
    private final NotificationSettingRepository notificationSettingRepository;



    @Override
    public void updateSetting(Long userId, NotificationSettingReqVO req) {
        NotificationSetting notificationSetting = getNotificationSetting(userId);
        BeanUtil.setTargetIfNotNull(notificationSetting, req);
        this.notificationSettingRepository.save(notificationSetting);
    }

    @Override
    public NotificationSetting getNotificationSetting(Long userId) {
        NotificationSetting notificationSetting = this.notificationSettingRepository.findById(userId)
                .orElse(null);
        if(notificationSetting == null) {
            notificationSetting = new NotificationSetting(userId);
            this.notificationSettingRepository.save(notificationSetting);
        }
        return notificationSetting;
    }
}
