package viosmash.service.notify;

import viosmash.dal.dataobject.NotifyMessage;
import viosmash.pojo.PageResult;

import java.util.List;

public interface NotifyMessageService {
    NotifyMessage createNotifyMessage(Long userId, String title, String body);
    PageResult<NotifyMessage> getListNotify(Long userId, int page, int limit);
    int countUnreadNotify(Long userId);
    void readAllNotifyMessage(Long userId);
    NotifyMessage readNotifyMessage(String notifyMessageId);
}
