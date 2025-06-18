package viosmash.service.notification;

import org.springframework.scheduling.annotation.Async;
import viosmash.controller.vo.NotificationMessageRespVO;
import viosmash.dal.dataobject.NotificationMessage;
import viosmash.notification.api.NotificationDto;
import viosmash.notification.enums.NotificationType;
import viosmash.notification.enums.TargetType;

import java.util.Collection;
import java.util.List;

public interface NotificationService {

    NotificationMessageRespVO saveNotification(NotificationMessage message);
    List<NotificationMessageRespVO> getListNotification(Long userId, int page, int limit);

    List<NotificationMessageRespVO> getListUnreadNotification(Long userId, int page, int limit);

    int countUnreadNotification(Long userId);

    void updateReadNotification(Long id);

    void updateAllNotification(Collection<Long> ids) ;

    void deleteNotification(Long targetId, TargetType targetType, NotificationType notificationType);

    void deleteNotification(Long id);

    @Async
    void sendNotification(NotificationDto req);
}
