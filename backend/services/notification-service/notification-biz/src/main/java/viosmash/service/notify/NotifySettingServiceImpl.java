package viosmash.service.notify;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.dal.dataobject.NotifySetting;
import viosmash.dal.repo.NotifySettingRepository;

@Service
@RequiredArgsConstructor
public class NotifySettingServiceImpl implements NotifySettingService{

    private final NotifySettingRepository notifySettingRepository;

    @Override
    public void updatePostSetting(Long userId, NotifySetting.Setting setting) {
        this.notifySettingRepository.save(getSetting(userId).setPost(setting));
    }

    @Override
    public void updateCommentSetting(Long userId, NotifySetting.Setting setting) {
        this.notifySettingRepository.save(getSetting(userId).setComment(setting));
    }

    @Override
    public void updateReactionSetting(Long userId, NotifySetting.Setting setting) {
        this.notifySettingRepository.save(getSetting(userId).setReaction(setting));
    }

    @Override
    public void updateChatSetting(Long userId, NotifySetting.Setting setting) {
        this.notifySettingRepository.save(getSetting(userId).setChat(setting));
    }

    @Override
    public void updateFriendSetting(Long userId, NotifySetting.Setting setting) {
        this.notifySettingRepository.save(getSetting(userId).setFriend(setting));
    }

    @Override
    public NotifySetting getSetting(Long userId) {
        NotifySetting notifySetting = this.notifySettingRepository.findById(userId).orElse(null);
        if(notifySetting == null) {
            notifySetting = new NotifySetting(userId);
        }
        this.notifySettingRepository.save(notifySetting);
        return notifySetting;
    }
}
