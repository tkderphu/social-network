package viosmash.service.notify;

import viosmash.controller.vo.message.NotifyMessageRespVO;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.pojo.api.notification.NotificationType;

import java.util.List;
import java.util.Map;

public interface NotifyMessageService {
    NotifyMessage createNotifyMessage(Long userId, NotificationType type, Map<String, Object> templateParams);
    List<NotifyMessageRespVO> getListNotify(Long userId);
    List<NotifyMessage> getListUnreadNotify(Long userId);
    int countUnreadNotify(Long userId);
    void readAllNotifyMessage(Long userId);

    void readNotifyMessage(Long notifyMessageId);
}
