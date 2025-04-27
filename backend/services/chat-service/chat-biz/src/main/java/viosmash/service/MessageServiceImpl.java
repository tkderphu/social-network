package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import viosmash.api.ProfileApi;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.ConversationCreateReq;
import viosmash.controller.vo.ConversationRespVO;
import viosmash.controller.vo.MessageReqVO;
import viosmash.controller.vo.MessageRespVO;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.Message;
import viosmash.dal.repo.MessageRepository;
import viosmash.dal.repo.UserConversationRepository;
import viosmash.enums.TopicChannel;
import viosmash.exception.ServiceException;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;

import java.util.List;
import java.util.Optional;

import static viosmash.convert.MessageConvert.INSTANCE;
import static viosmash.dal.dataobject.Conversation.ConversationType.ONE_ONE;
import static viosmash.exception.utils.ServiceUtils.exception;


@Service
@Slf4j
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{

    private final MessageRepository messageRepository;
    private final ConversationService conversationService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserConversationRepository userConversationRepository;
    private final ProfileApi profileApi;
    @Override
    public void createMessage(MessageReqVO req) {
        Message message = BeanUtil.copy(req, Message.class);
        Conversation conversation = null;
        if(req.getConversationId() != null) {
            conversation = conversationService.getConversation(req.getConversationId());
        } else if(req.getToUserId() != null) {
            try {
                var isNull = conversationService.getConversation(req.getSenderId(), req.getToUserId());
                conversation = new Conversation().setId(isNull.getId());
            } catch (ServiceException ex) {
                log.info("two user hasn't established yet");
                conversation = conversationService.createConversation(new ConversationCreateReq(
                        null, ONE_ONE, List.of(req.getSenderId(), req.getToUserId())
                ));
                message.setConversationId(conversation.getId());
            }
        } else {
            throw exception(HttpStatus.BAD_REQUEST.value(), "Destination(conversationId or toUserId) can't null");
        }
        this.messageRepository.save(message);
        MessageRespVO resp = BeanUtil.copy(message, MessageRespVO.class)
                .setSender(profileApi.getUserById(message.getSenderId()));
        log.info("create message ok : {}", resp);

        Long[] userIds = this.userConversationRepository.findAllUserIdByConversationId(conversation.getId());
        ConversationRespVO conResp = BeanUtil.copy(conversation, ConversationRespVO.class)
                .setLatestMessage(resp);

        for(Long userId : userIds) {
            simpMessagingTemplate.convertAndSend(
                    String.format(TopicChannel.USER_CHAT_NEW_CONVERSATION, userId),
                    conResp);
        }
    }


    @Override
    public List<MessageRespVO> getListMessage(Long conversationId, Long beforeMessageId, int limit) {
        List<Message> messages = messageRepository.findAllByConversationId(conversationId, beforeMessageId, limit);
        return CollUtils.convertList(messages, (msg) -> {
           return INSTANCE.convert(msg, profileApi.getUserById(msg.getSenderId()));
        });
    }


}
