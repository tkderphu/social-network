package viosmash.service.notify;

import viosmash.dal.dataobject.NotifyMessage;
import viosmash.dal.dataobject.NotifyTemplate;

import java.util.List;
import java.util.Map;

public interface NotifyMessageService {
    NotifyMessage createNotifyMessage(Long userId, NotifyTemplate template, Map<String, Object> templateParams);
    List<NotifyMessage> getListNotify(Long userId);
    List<NotifyMessage> getListUnreadNotify(Long userId);
    int countUnreadNotify(Long userId);
    void readAllNotifyMessage(Long userId);

    void readNotifyMessage(Long notifyMessageId);
}
