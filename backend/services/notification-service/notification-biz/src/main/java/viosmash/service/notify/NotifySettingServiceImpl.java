package viosmash.service.notify;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.dal.dataobject.NotifySetting;
import viosmash.dal.repo.NotifySettingRepository;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class NotifySettingServiceImpl implements NotifySettingService{

    private final NotifySettingRepository notifySettingRepository;

    @Override
    public void updateNotifyChatAction(Long userId, Boolean enable) {
        notifySettingRepository.save(getSetting(userId).setEnableNotifyChatAction(enable));
    }

    @Override
    public void updateNotifyCommentAction(Long userId, Boolean enable) {
        notifySettingRepository.save(getSetting(userId).setEnableNotifyCommentAction(enable));
    }

    @Override
    public void updateNotifyReactionAction(Long userId, Boolean enable) {
        notifySettingRepository.save(getSetting(userId).setEnableNotifyReactionAction(enable));
    }

    @Override
    public void updateNotifyFriendAction(Long userId, Boolean enable) {
        notifySettingRepository.save(getSetting(userId).setEnableNotifyFriendAction(enable));
    }

    @Override
    public NotifySetting getSetting(Long userId) {
        return this.notifySettingRepository.findByUserId(userId)
                .orElseThrow(() -> exception(404, "not found notifySetting by userId: " + userId));
    }
}
