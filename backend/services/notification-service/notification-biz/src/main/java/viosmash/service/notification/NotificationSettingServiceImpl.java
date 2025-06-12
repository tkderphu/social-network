package viosmash.service.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.controller.v1.vo.CommentNotificationSettingReqVO;
import viosmash.controller.v1.vo.PostNotificationSettingReqVO;
import viosmash.controller.v1.vo.VoteNotificationSettingReqVO;
import viosmash.dal.dataobject.v1.NotificationSetting;
import viosmash.dal.repo.v1.NotificationSettingRepository;

@Service
@RequiredArgsConstructor
public class NotificationSettingServiceImpl implements NotificationSettingService{
    private final NotificationSettingRepository notificationSettingRepository;


    @Override
    public void updatePushNotification(Long userId, Boolean enablePushNotification) {
        this.notificationSettingRepository.save(
                getNotificationSetting(userId).setEnablePushNotification(enablePushNotification)
        );
    }

    @Override
    public void updateSoundNotification(Long userId, Boolean enableSoundNotification) {
        this.notificationSettingRepository.save(
                getNotificationSetting(userId).setEnableSoundNotification(enableSoundNotification)
        );
    }

    @Override
    public void updatePostNotification(Long userId, PostNotificationSettingReqVO req) {
        NotificationSetting notificationSetting = getNotificationSetting(userId);
        notificationSetting.getPostSetting().put(req.getType(), req.getEnable());
        this.notificationSettingRepository.save(notificationSetting);
    }

    @Override
    public void updateCommentNotification(Long userId, CommentNotificationSettingReqVO req) {
        NotificationSetting notificationSetting = getNotificationSetting(userId);
        notificationSetting.getCommentSetting().put(req.getType(), req.getEnable());
        this.notificationSettingRepository.save(notificationSetting);
    }

    @Override
    public void updateVoteNotification(Long userId, VoteNotificationSettingReqVO req) {
        NotificationSetting notificationSetting = getNotificationSetting(userId);
        notificationSetting.getVoteSetting().put(req.getType(), req.getEnable());
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
