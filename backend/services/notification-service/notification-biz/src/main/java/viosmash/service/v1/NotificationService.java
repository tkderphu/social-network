package viosmash.service.v1;

import org.springframework.scheduling.annotation.Async;
import viosmash.controller.v1.vo.NotificationRespVO;
import viosmash.dal.dataobject.v1.FriendNotification;
import viosmash.dal.dataobject.v1.Notification;

import java.util.List;

public interface NotificationService {
    List<NotificationRespVO> getListNotification(Long userId, int page, int limit);
    List<NotificationRespVO> getListNotification(Long userId, Boolean isRead, int page, int limit);
    int countUnread(Long userId, Boolean isRead);
    void updateRead(Long id);

    void updateReadAll(Long userId);

    @Async
    void saveNotification(Notification notification);

    @Async
    void deleteNotification(Notification notification);
}
