package viosmash.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.collection.CollUtils;
import viosmash.friendship.api.FriendshipApi;
import viosmash.notification.api.NotificationApi;
import viosmash.pojo.api.notification.NotificationDto;
import viosmash.service.notify.SendNotifyService;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping(NotificationApi.PREFIX)
@Slf4j
public class NotificationApiImpl implements NotificationApi {

    private final SendNotifyService sendNotifyService;
    private final FriendshipApi friendshipApi;
    @Override
    @PostMapping("/send")
    public void sendNotification(@RequestBody NotificationDto req) {
        switch (req.getType()) {
            case FORGOT_PASSWORD -> {
                log.info("begin send");
                sendNotifyService.mailNotifySingleMessage(req.getProperties(), req.getType(), "Forgot password");
                log.info("end send");
            }
            case CREATED_REQUEST_FRIEND -> {
                log.info("create request friend");
                Long userId = Long.parseLong(req.getProperties().get("toUserId") + "");
                sendNotifyService.sendNotifyMessage(userId, req.getType(), req.getProperties());
            }
            case NEW_POST -> {
                log.info("new post coming");
                Long fromUserId = req.getValueFromProperties(NotificationDto.KeyParams.FROM_USER_ID);
                List<Long> friends = friendshipApi.getListFriends(fromUserId);
                CollUtils.convertList(friends, friend -> {
                    sendNotifyService.sendNotifyMessage(friend, req.getType(), req.getProperties());
                    return null;
                });
            }
            case CREATED_COMMENT -> {
                log.info("new comment coming");
                Long toUserId = req.getValueFromProperties(NotificationDto.KeyParams.TO_USER_ID);
                sendNotifyService.sendNotifyMessage(toUserId, req.getType(), req.getProperties());
            }
            case CREATED_REPLY_COMMENT -> {
                log.info("new reply comment coming");
                Long toUserId = req.getValueFromProperties(NotificationDto.KeyParams.TO_USER_ID);
                sendNotifyService.sendNotifyMessage(toUserId, req.getType(), req.getProperties());
            }
        }
    }

    @Override
    public void deleteNotification(NotificationDto req) {

    }
}
