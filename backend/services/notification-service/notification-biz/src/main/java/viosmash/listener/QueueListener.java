package viosmash.listener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import viosmash.config.TemplateConfig;
import viosmash.dal.dataobject.FirebaseMessageToken;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.dal.dataobject.NotifySetting;
import viosmash.dal.repo.FirebaseMessageTokenRepository;
import viosmash.dal.repo.NotifyMessageRepository;
import viosmash.dal.repo.NotifySettingRepository;
import viosmash.date.DateUtils;
import viosmash.enums.NotificationTemplate;
import viosmash.event.friend.FriendEvent;
import viosmash.service.firebase.FCMService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static viosmash.EventConstant.*;
import static viosmash.exception.utils.ServiceUtils.exception;

@Component
@Slf4j
@RequiredArgsConstructor
public class QueueListener {

    private final NotifyMessageRepository notifyMessageRepository;
    private final FCMService fcmService;
    private final TemplateConfig templateConfig;
    private final NotifySettingRepository notifySettingRepository;
    private final FirebaseMessageTokenRepository firebaseMessageTokenRepository;
    @RabbitListener(queues = CREATE_REQUEST_FRIEND_REQUEST + QUEUE_SUFFIX)
    public void listenCreatedRequestFriend(FriendEvent friendEvent) {
        log.info("Receive make request friend: {}", friendEvent);
        sendNotifyFriendEvent(friendEvent, NotificationTemplate.CREATED_REQUEST_FRIEND);
    }

    @RabbitListener(queues = ACCEPT_FRIENDS_REQUEST + QUEUE_SUFFIX)
    public void listenAcceptFriendRequest(FriendEvent friendEvent) {
        log.info("Accept make request friend: {}", friendEvent);
        sendNotifyFriendEvent(friendEvent, NotificationTemplate.ACCEPTED_REQUEST_FRIEND);

    }

    private  void sendNotifyFriendEvent(FriendEvent friendEvent,
                              NotificationTemplate notificationTemplate) {
        Context context = new Context();
        context.setVariable("profileId", friendEvent.getFromUser().getId());
        context.setVariable("imageUrl", friendEvent.getFromUser().getImageUrl());
        context.setVariable("name", friendEvent.getFromUser().getFullName());
        context.setVariable("timestamp", DateUtils.formatFull(friendEvent.getDate()));
        String html = templateConfig.parseHtml(notificationTemplate, context);
        Optional<NotifySetting> optional = this.notifySettingRepository.findByUserId(friendEvent.getToUser().getId());
        if(optional.isPresent()) {
            if(optional.get().getEnableNotifyFriendAction()) {
                NotifyMessage notifyMessage = new NotifyMessage().setCreatedAt(LocalDateTime.now())
                        .setId(UUID.randomUUID().toString()).setContent(html).setRead(false)
                        .setUserId(friendEvent.getFromUser().getId()).setReadAt(null);
                FirebaseMessageToken firebaseMessageToken = firebaseMessageTokenRepository.findByUserId(friendEvent.getFromUser().getId()).get();
                notifyMessageRepository.save(notifyMessage);
                fcmService.sendNotification("", html, firebaseMessageToken.getToken());
                return;
            }
            return;
        }
        throw exception(404, "SettingNotification with user was failed, because not exist user");
    }

}
