package viosmash.service.notification;

import viosmash.controller.v1.vo.NotificationMessageRespVO;
import viosmash.dal.dataobject.v1.NotificationMessage.NotificationType;
import viosmash.dal.dataobject.v1.NotificationMessage.TargetType;

import java.util.Collection;
import java.util.List;

public interface NotificationService {

    List<NotificationMessageRespVO> getListNotification(Long userId, int page, int limit);

    List<NotificationMessageRespVO> getListUnreadNotification(Long userId, int page, int limit);

    int countUnreadNotification(Long userId);

    void updateReadNotification(Long id);

    void updateAllNotification(Collection<Long> ids) ;

    void deleteNotification(Long targetId, TargetType targetType, NotificationType notificationType);

    void deleteNotification(Long id);
}
