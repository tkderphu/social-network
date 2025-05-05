package viosmash.listener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import viosmash.dal.repo.FirebaseMessageTokenRepository;
import viosmash.dal.repo.NotifySettingRepository;
import viosmash.enums.NotificationType;
import viosmash.event.follow.FollowUser;
import viosmash.event.friend.FriendEvent;
import viosmash.service.firebase.FCMService;
import viosmash.service.notify.SendNotifyService;

import java.util.HashMap;
import java.util.Map;

import static viosmash.EventConstant.*;
import static viosmash.enums.NotificationType.ACCEPTED_REQUEST_FRIEND;
import static viosmash.enums.NotificationType.CREATED_REQUEST_FRIEND;
import static viosmash.exception.utils.ServiceUtils.exception;

@Component
@Slf4j
@RequiredArgsConstructor
public class QueueListener {
    //{{userFullName}} da gui loi moi ket ban den ban.
    private final SendNotifyService sendNotifyService;
    private final FCMService fcmService;
    private final NotifySettingRepository notifySettingRepository;
    private final FirebaseMessageTokenRepository firebaseMessageTokenRepository;


    @RabbitListener(queues = FOLLOW_USER + QUEUE_SUFFIX)
    public void listenFollowUser(FollowUser followUser) {
        log.info("Receive follow user request: {}", followUser);
        Map<String, Object> templateParams = new HashMap<>();
        templateParams.put("read", "");
        templateParams.put("time","");
        templateParams.put("userFullName", followUser.getFromUser().getFullName());
        templateParams.put("userId", followUser.getFromUser().getId());
        templateParams.put("userAvatar", followUser.getFromUser().getImageUrl());
        sendNotifyService.sendNotifyMessage(followUser.getToUserId(), NotificationType.FOLLOW_USER.name(), templateParams);
    }

    @RabbitListener(queues = CREATE_REQUEST_FRIEND_REQUEST + QUEUE_SUFFIX)
    public void listenCreatedRequestFriend(FriendEvent friendEvent) {
        log.info("Receive make request friend: {}", friendEvent);
        Map<String, Object> templateParams = new HashMap<>();
        templateParams.put("userFullName", friendEvent.getFromUser().getFullName());
        templateParams.put("userId", friendEvent.getFromUser().getId());
        templateParams.put("read", "");
        templateParams.put("time","");
        templateParams.put("userAvatar", friendEvent.getFromUser().getImageUrl());
        sendNotifyService.sendNotifyMessage(friendEvent.getToUser().getId(), CREATED_REQUEST_FRIEND.name(), templateParams);
    }

    @RabbitListener(queues = ACCEPT_FRIENDS_REQUEST + QUEUE_SUFFIX)
    public void listenAcceptFriendRequest(FriendEvent friendEvent) {
        log.info("Accept make request friend: {}", friendEvent);
        Map<String, Object> templateParams = new HashMap<>();
        templateParams.put("userFullName", friendEvent.getFromUser().getFullName());
        templateParams.put("userId", friendEvent.getFromUser().getId());
        templateParams.put("read", "");
        templateParams.put("time","");
        templateParams.put("userAvatar", friendEvent.getFromUser().getImageUrl());
        sendNotifyService.sendNotifyMessage(friendEvent.getToUser().getId(),ACCEPTED_REQUEST_FRIEND.name(), templateParams);
    }

    private  void sendNotifyFriendEvent(FriendEvent friendEvent,
                              NotificationType notificationType) {

//        Optional<NotifySetting> optional = this.notifySettingRepository.findByUserId(friendEvent.getToUser().getId());
//        if(optional.isPresent()) {
//            if(optional.get().getEnableNotifyFriendAction()) {
//                NotifyMessage notifyMessage = new NotifyMessage()
//                        .setCreatedAt(LocalDateTime.now())
//                        .setId(UUID.randomUUID().toString())
//                        .setRead(false)
//                        .setUserId(friendEvent.getFromUser().getId()).setReadAt(null);
//                FirebaseMessageToken firebaseMessageToken = firebaseMessageTokenRepository.findByUserId(friendEvent.getFromUser().getId()).get();
//                notifyMessageRepository.save(notifyMessage);
//                fcmService.sendNotification("", html, firebaseMessageToken.getToken());
//                return;
//            }
//            return;
//        }
//        throw exception(404, "SettingNotification with user was failed, because not exist user");
    }

}
