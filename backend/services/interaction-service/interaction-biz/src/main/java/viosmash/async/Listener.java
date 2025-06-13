package viosmash.async;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import viosmash.dal.dataobject.Comment;
import viosmash.notification.api.NotificationApi;
import viosmash.notification.api.NotificationDto;
import viosmash.notification.enums.TargetType;
import viosmash.pojo.api.post.PostDTO;
import viosmash.post.api.PostApi;
import viosmash.services.CommentService;

@RequiredArgsConstructor
@Component
@Slf4j
public class Listener {
    private final NotificationApi notificationApi;
    private final PostApi postApi;
    private final CommentService commentService;
    @Async
    @EventListener
    public void saveNotification(NotificationDto dto) {
        if(dto.getTargetType() == TargetType.COMMENT) {
            Comment comment = commentService.getById(dto.getTargetId());
            dto.setUserId(comment.getUserId());
        } else if(dto.getTargetType() == TargetType.POST) {
            PostDTO postDTO = postApi.getPostById(dto.getTargetId());
            dto.setUserId(postDTO.getUser().getId());
        }
        notificationApi.sendAppNotification(dto);
    }



}
