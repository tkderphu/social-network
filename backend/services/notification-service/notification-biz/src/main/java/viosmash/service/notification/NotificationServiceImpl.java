package viosmash.service.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.NotificationMessageRespVO;
import viosmash.dal.dataobject.NotificationMessage;
import viosmash.dal.repo.NotificationMessageRepository;
import viosmash.exception.ServiceException;
import viosmash.interaction.api.comment.CommentApi;
import viosmash.interaction.api.vote.VoteApi;
import viosmash.notification.enums.NotificationType;
import viosmash.notification.enums.TargetType;
import viosmash.object.BeanUtil;
import viosmash.pojo.api.profile.UserDTO;
import viosmash.post.api.PostApi;
import viosmash.profile.api.UserApi;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;


@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{
    private final NotificationMessageRepository notificationMessageRepository;
    private final UserApi userApi;
    private final PostApi postApi;
    private final CommentApi commentApi;
    private final VoteApi voteApi;

    @Override
    public NotificationMessageRespVO saveNotification(NotificationMessage message) {
        NotificationMessage save = this.notificationMessageRepository.save(message);
        Long actorId = message.getActorId();
        Long targetId = message.getTargetId();
        TargetType targetType = message.getTargetType();
        Object target = switch (targetType) {
            case POST -> postApi.getPostById(targetId);
            case COMMENT -> commentApi.getById(targetId);
            case USER -> userApi.getUserById(targetId);
            case VOTE -> voteApi.getById(targetId);
        };
        UserDTO user = userApi.getUserById(actorId);
        NotificationMessageRespVO copy = BeanUtil.copy(save, NotificationMessageRespVO.class)
                .setTarget(target).setActor(user);
        return copy;
    }

    @Override
    public List<NotificationMessageRespVO> getListNotification(Long userId, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        List<Object[]> notifications = notificationMessageRepository.findAllByUserId(userId, limit, (int) pageable.getOffset());
        return CollUtils.convertList(notifications, this::convert);
    }

    @Override
    public List<NotificationMessageRespVO> getListUnreadNotification(Long userId, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        List<Object[]> notifications = notificationMessageRepository.findAllByUserIdAndSeen(userId, false, limit, (int) pageable.getOffset());
        return CollUtils.convertList(notifications, this::convert);
    }

    @Override
    public int countUnreadNotification(Long userId) {
        return notificationMessageRepository.countUnread(userId);
    }

    @Override
    @Transactional(rollbackFor = ServiceException.class)
    public void updateReadNotification(Long id) {
        this.notificationMessageRepository.updateSeenNotification(id);
    }

    @Override
    @Transactional(rollbackFor = ServiceException.class)
    public void updateAllNotification(Collection<Long> ids) {
        this.notificationMessageRepository.updateAllSeenNotification(ids);
    }

    @Override
    @Transactional
    public void deleteNotification(Long targetId,
                                   TargetType targetType,
                                   NotificationType notificationType) {
        this.notificationMessageRepository.deleteAllByTargetIdAndTargetTypeAndNotificationType(
                targetId,
                targetType,
                notificationType
        );
    }

    @Override
    public void deleteNotification(Long id) {
        NotificationMessage notificationMessage = this.notificationMessageRepository.findById(id).orElse(null);
        if(notificationMessage != null) {
            deleteNotification(
                    notificationMessage.getTargetId(),
                    notificationMessage.getTargetType(),
                    notificationMessage.getNotificationType()
            );
        }
    }


    public NotificationMessageRespVO convert(Object[] obj) {
        NotificationMessageRespVO res = new NotificationMessageRespVO();
        Long actorId = (Long) obj[5];
        Long targetId = (Long)obj[2];
        TargetType targetType = TargetType.valueOf((String) obj[1]);
        Object target = switch (targetType) {
            case POST -> postApi.getPostById(targetId);
            case COMMENT -> commentApi.getById(targetId);
            case USER -> userApi.getUserById(targetId);
            case VOTE -> voteApi.getById(targetId);
        };
        UserDTO user = userApi.getUserById(actorId);

        res.setId((Long) obj[0]).setTargetType(targetType)
                .setTarget(target).setNotificationType(NotificationType.valueOf((String) obj[3]))
                .setCreatedAt(((Timestamp) obj[4]).toLocalDateTime())
                .setActor(user).setSeen((Boolean) obj[7])
                .setOthers((Long) obj[8]);
        return res;

    }

}
