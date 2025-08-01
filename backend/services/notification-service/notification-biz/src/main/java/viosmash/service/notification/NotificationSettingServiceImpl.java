package viosmash.service.notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import viosmash.controller.vo.NotificationSettingReqVO;
import viosmash.dal.dataobject.NotificationSetting;
import viosmash.dal.repo.NotificationSettingRepository;
import viosmash.object.BeanUtil;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationSettingServiceImpl implements NotificationSettingService{
    private final NotificationSettingRepository notificationSettingRepository;



    @Override
    public void updateSetting(Long userId, NotificationSettingReqVO req) {
        NotificationSetting notificationSetting = getNotificationSetting(userId);
        notificationSetting
                .setEnablePushNotification(req.getEnablePushNotification())
                .setEnablePostFriendsNotification(req.getEnablePostFriendsNotification())
                .setEnablePostGroupsNotification(req.getEnablePostGroupsNotification())
                .setEnableAcceptRequestNotification(req.getEnableAcceptRequestNotification())
                .setEnableFriendsRequestNotification(req.getEnableFriendsRequestNotification())
                .setEnableSoundNotification(req.getEnableSoundNotification());
        this.notificationSettingRepository.save(notificationSetting);
    }

    @Override
    public NotificationSetting getNotificationSetting(Long userId) {
        NotificationSetting notificationSetting = this.notificationSettingRepository
                .findByUserId   (userId)
                .orElse(null);
        if(notificationSetting == null && userId != null) {
            notificationSetting = new NotificationSetting(userId);
            this.notificationSettingRepository.save(notificationSetting);
        }
        log.info("setting: {}", notificationSetting);
        return notificationSetting;
    }
}
