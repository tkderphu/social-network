package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.collection.CollUtils;
import viosmash.controller.message.vo.MessageCreateReqVO;
import viosmash.controller.message.vo.MessageRespVO;
import viosmash.dal.dataobject.*;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.MessageRepository;
import viosmash.object.BeanUtil;
import viosmash.profile.api.UserApi;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;
import java.util.List;

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
    @Override
    @Transactional
    public void createMessage(MessageCreateReqVO req) {
        UserDTO sender = userApi.getUserById(req.getSenderId());
        Conversation conversation = conversationRepository.findById(req.getConversationId())
                .orElse(null);
        Boolean isNewConversation = false;
        Boolean soundNotification = false;
        Boolean pushNotifictaion = false;
        if(conversation == null) {
            conversation = new Conversation().setId(req.getConversationId())
                    .setCreatedAt(LocalDateTime.now()).setConversationType(ConversationType.PRIVATE)
                    .setId(req.getConversationId());
            this.conversationRepository.save(conversation);
            memberConversationService.invite(conversation.getId(), List.of(req.getSenderId(), req.getToUserId()), null);

            isNewConversation = true;
            soundNotification = true;
            pushNotifictaion = true;
        } else {
            MemberConversation memberConversation = memberConversationService
                    .getMemberConversation(req.getSenderId(), req.getConversationId());

            soundNotification = memberConversation.getEnableSoundNotification();
            pushNotifictaion = memberConversation.getEnablePushNotification();
        }

        Message message = BeanUtil.copy(req, Message.class)
                .setSenderId(sender.getId())
                .setCreatedAt(LocalDateTime.now())
                .setConversation(conversation)
                .setIsRead(false);

        this.messageRepository.save(message);

        MessageRespVO resp = BeanUtil.copy(message, MessageRespVO.class)
                .setSender(sender)
                .setConversationId(message.getConversation().getId());

        simpMessagingTemplate.convertAndSend("/topic/chat/conversation/" + req.getConversationId(), resp);

        if(soundNotification != null && soundNotification) {
            simpMessagingTemplate.convertAndSend("/topic/chat/soundNotification", "");
        }

        if(pushNotifictaion != null && pushNotifictaion) {
            log.warn("[+]==============Push Notification haven't implemented yet==================[+]");
        }

        if(isNewConversation) {
            List.of(req.getSenderId(), req.getToUserId()).forEach(userId -> {
                simpMessagingTemplate.convertAndSend("/topic/chat/user/" + userId, "new conversation between user");
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
    public int countUnreadMessage(Long userId) {
        return this.messageRepository.countUnreadMessage(userId);
    }
}
