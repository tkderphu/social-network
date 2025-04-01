package viosmash.service.notify;

import viosmash.dal.dataobject.NotifyMessage;

import java.util.List;

public interface NotifyMessageService {
    NotifyMessage createNotifyMessage();
    List<NotifyMessage> getListNotify(Long userId);
    int countUnreadNotify(Long userId);
    void readAllNotifyMessage(Long userId);
    NotifyMessage readNotifyMessage(Long userId);
}
