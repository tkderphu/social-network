package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.chat.config.properties.Topic;
import viosmash.collection.CollUtils;
import viosmash.controller.message.vo.MessageCreateReqVO;
import viosmash.controller.message.vo.MessageRespVO;
import viosmash.dal.dataobject.*;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.MessageRepository;
import viosmash.friendship.api.FriendshipApi;
import viosmash.object.BeanUtil;
import viosmash.object.ObjectUtils;
import viosmash.profile.api.UserApi;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static viosmash.exception.utils.ServiceUtils.exception;


@Service
@Slf4j
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{
    private final MemberConversationService memberConversationService;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final UserApi userApi;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final FriendshipApi friendshipApi;
    private final Topic topic;
    @Override
    @Transactional
    public void createMessage(MessageCreateReqVO req) {
        UserDTO sender = userApi.getUserById(req.getSenderId());
        List<MemberConversation> memberConversations = null;
        Conversation conversation = conversationRepository
                .findById(req.getConversationId()).orElse(null);
        Boolean isNewConversation = false;
        Boolean soundNotification = false;
        Boolean pushNotifictaion = false;
        if(conversation == null) {
            Boolean isFriend = friendshipApi.isFriend(req.getSenderId(), req.getToUserId());
            conversation = new Conversation().setId(req.getConversationId())
                    .setCreatedAt(LocalDateTime.now()).setConversationType(ConversationType.PRIVATE)
                    .setVisible(ObjectUtils.isNullAble(isFriend, false))
                    .setId(req.getConversationId());
            this.conversationRepository.save(conversation);
            memberConversationService.invite(conversation.getId(), List.of(req.getSenderId(), req.getToUserId()), null);

            isNewConversation = true;
            if(isFriend) {
                soundNotification = true;
                pushNotifictaion = true;
            }
        } else {
            memberConversations = memberConversationService
                    .getListMemberConversationByConversationId(conversation.getId());
        }

        Message message = BeanUtil.copy(req, Message.class)
                .setSenderId(sender.getId())
                .setCreatedAt(LocalDateTime.now())
                .setConversation(conversation);

        this.messageRepository.save(message);

        MessageRespVO resp = BeanUtil.copy(message, MessageRespVO.class)
                .setSender(sender)
                .setConversationId(message.getConversation().getId());

        simpMessagingTemplate.convertAndSend(String.format(topic.getChat(), req.getConversationId()), resp);

        CollUtils.convertList(memberConversations, mc -> {
            if(ObjectUtils.isNullAble(mc.getEnableSoundNotification(), false)) {
                simpMessagingTemplate.convertAndSend(String.format(topic.getNotification(), mc.getMemberId()), "");
            }

            if(ObjectUtils.isNullAble(mc.getEnablePushNotification(), false)) {
                //firebase
            }
            return null;
        });
        if(soundNotification != null && soundNotification) {
            simpMessagingTemplate.convertAndSend(String.format(topic.getNotification(), 1), "");
        }

        if(pushNotifictaion != null && pushNotifictaion) {
            log.warn("[+]==============Push Notification haven't implemented yet==================[+]");
        }

        if(isNewConversation) {
            List.of(req.getSenderId(), req.getToUserId()).forEach(userId -> {
                simpMessagingTemplate.convertAndSend(
                        String.format(topic.getNewConversation(), userId),
                        "new conversation between user");
            });
        }
    }


    @Override
    public List<MessageRespVO> getListMessage(String conversationId, Long beforeMessageId, int limit) {
        List<Message> messages = this.messageRepository.findAllByConversationId(conversationId, beforeMessageId, limit);

        return CollUtils.convertList(messages, msg -> {
           return BeanUtil.copy(msg, MessageRespVO.class)
                   .setConversationId(msg.getConversation().getId())
                   .setSender(userApi.getUserById(msg.getId()));
        });
    }

    @Override
    public List<MessageRespVO> getListMessage(String conversationId) {
        List<Message> messages = messageRepository.findAllByConversationId(conversationId);
        return CollUtils.convertList(messages, msg -> {
            return BeanUtil.copy(msg, MessageRespVO.class)
                    .setConversationId(msg.getConversation().getId())
                    .setSender(userApi.getUserById(msg.getSenderId()));
        });
    }

    @Override
    public long countTotalUnreadMessage(Long userId) {
        return messageRepository.countTotalUnread(userId);
    }

    @Override
    public Map<String, Long> getUnreadMessageCountPerConversation(Long userId) {
        Map<String, Long> map = new HashMap<>();
        CollUtils.convertList(messageRepository.countUnreadPerConversation(userId), objs -> {
           String conversationId = (String) objs[0];
           Long countUnread = (Long)objs[1];
           map.put(conversationId, countUnread);
           return null;
        });
        return map;
    }

    @Override
    @Transactional
    public void updateReadMessage(Long userId, Long conversationId) {
        messageRepository.updateReadMessage(userId, conversationId);
    }
}
