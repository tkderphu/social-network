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
    public Boolean updateNotifyChatAction(Long userId, Boolean enable) {
        return null;
    }

    @Override
    public Boolean updateNotifyCommentAction(Long userId, Boolean enable) {
        return null;
    }

    @Override
    public Boolean updateNotifyReactionAction(Long userId, Boolean enable) {
        return null;
    }

    @Override
    public Boolean updateNotifyFriendAction(Long userId, Boolean enable) {
        return null;
    }

    @Override
    public NotifySetting getSetting(Long userId) {
        return null;
    }
}
