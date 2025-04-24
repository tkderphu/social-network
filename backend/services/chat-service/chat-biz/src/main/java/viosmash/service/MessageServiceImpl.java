//package viosmash.service;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//import org.springframework.http.HttpStatus;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Service;
//import viosmash.api.ProfileApi;
//import viosmash.controller.vo.ConversationCreateReq;
//import viosmash.controller.vo.ConversationRespVO;
//import viosmash.controller.vo.MessageReqVO;
//import viosmash.controller.vo.MessageRespVO;
//import viosmash.convert.MessageConvert;
//import viosmash.dal.dataobject.Conversation;
//import viosmash.dal.dataobject.Message;
//import viosmash.dal.repo.MessageRepository;
//import viosmash.enums.TopicChannel;
//import viosmash.object.BeanUtil;
//import viosmash.pojo.PageResult;
//
//import java.util.List;
//import java.util.Optional;
//
//import static viosmash.convert.MessageConvert.INSTANCE;
//import static viosmash.dal.dataobject.Conversation.ConversationType.ONE_ONE;
//import static viosmash.exception.utils.ServiceUtils.exception;
//
//
//@Service
//@RequiredArgsConstructor
//public class MessageServiceImpl implements MessageService{
//
//    private final MessageRepository messageRepository;
//    private final ConversationService conversationService;
//    private final SimpMessagingTemplate simpMessagingTemplate;
//    private final ProfileApi profileApi;
//    @Override
//    public void createMessage(MessageReqVO req) {
//        Message message = BeanUtil.copy(req, Message.class);
//        Conversation conversation = null;
//        if(req.getConversationId() != null) {
//            this.messageRepository.save(message);
//        } else if(req.getToUserId() != null) {
//            conversation = conversationService.createConversation(new ConversationCreateReq(
//                    null, ONE_ONE, List.of(req.getSenderId(), req.getToUserId())
//            ));
//            message.setConversationId(conversation.getId());
//            this.messageRepository.save(message);
//        } else {
//            throw exception(HttpStatus.BAD_REQUEST.value(), "Destination(conversationId or toUserId) can't null");
//        }
//        MessageRespVO resp = BeanUtil.copy(message, MessageRespVO.class)
//                .setSender(profileApi.getUserById(message.getSenderId()));
//        if(conversation != null) {
//            ConversationRespVO conResp = BeanUtil.copy(conversation, ConversationRespVO.class)
//                            .setLatestMessage(BeanUtil.copy(message, MessageRespVO.class));
//            simpMessagingTemplate.convertAndSend(String.format(TopicChannel.USER_CHAT_NEW_CONVERSATION,req.getSenderId()), conResp);
//            simpMessagingTemplate.convertAndSend(String.format(TopicChannel.USER_CHAT_NEW_CONVERSATION, req.getToUserId()), conResp);
//        }
//        simpMessagingTemplate.convertAndSend(String.format(TopicChannel.USER_CHAT, message.getConversationId()), resp);
//    }
//
//    @Override
//    public PageResult<Message> getPageMessage(int page, int limit, Long conversationId) {
//        PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
//        Page<Message> pageResp = this.messageRepository.findAll(pageRequest);
//        return new PageResult<>(pageResp.getNumber() + 1, limit, pageResp.getContent());
//    }
//
//    @Override
//    public MessageRespVO getLatestMessage(Long conversationId) {
//        Optional<Message> message = messageRepository.findLatestMessageByConversationId(conversationId);
//        if(message.isEmpty()) return null;
//        return INSTANCE.convert(message.get(), profileApi.getUserById(message.get().getSenderId()));
//    }
//}
