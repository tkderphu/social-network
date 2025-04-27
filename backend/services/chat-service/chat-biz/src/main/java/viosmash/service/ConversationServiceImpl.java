package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import viosmash.api.ProfileApi;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.ConversationCreateReq;
import viosmash.controller.vo.ConversationRespVO;
import viosmash.convert.ConversationConvert;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.Message;
import viosmash.dal.dataobject.UserConversation;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.MessageRepository;
import viosmash.dal.repo.UserConversationRepository;
import viosmash.object.BeanUtil;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static viosmash.convert.MessageConvert.INSTANCE;
import static viosmash.exception.utils.ServiceUtils.exception;

@Slf4j
@RequiredArgsConstructor
@Service
public class ConversationServiceImpl implements ConversationService{

    private final UserConversationRepository userConversationRepository;
    private final ConversationRepository conversationRepository;
    private final MessageRepository  messageRepository;
    private final ProfileApi profileApi;
    @Override
    public Conversation createConversation(ConversationCreateReq req) {
        Conversation conversation = new Conversation()
                .setCreatedAt(LocalDateTime.now())
                .setType(req.getType()).setName(req.getName());
        this.conversationRepository.save(conversation);
        CollUtils.convertList(req.getUserIds(), id -> {
            UserConversation userConversation = new UserConversation().setUserId(id)
                    .setConversationId(conversation.getId())
                    .setJoinedAt(LocalDateTime.now());
            this.userConversationRepository.save(userConversation);
            return null;
        });
        return conversation;
    }

    @Override
    public List<ConversationRespVO> getListConversation(Long userId) {
        List<UserConversation> userConversations = this.userConversationRepository.findAllByUserId(userId);
        log.info("size: {}{}", userConversations.size(), userConversations.get(0));
        return CollUtils.convertList(userConversations, uc -> {
            Optional<Message> message = messageRepository.findLatestMessageByConversationId(uc.getConversationId());
            return BeanUtil.copy(getConversation(uc.getConversationId()), ConversationRespVO.class)
                    .setLatestMessage(INSTANCE.convert(message.get(), profileApi.getUserById(message.get().getSenderId())));
        });
    }

    @Override
    public Conversation getConversation(Long id) {
        return this.conversationRepository.findById(id)
                .orElseThrow(() -> exception(404, "not found conversation"));
    }


    @Override
    public void addUsersToGroup(Long conversationId, Collection<Long> userIds) {

    }

    @Override
    public ConversationRespVO getConversation(Long userOne, Long userTwo) {
        Conversation conversation = this.conversationRepository.findOneBy(userOne, userTwo);
        if(conversation == null) throw exception(404, String.format("User %s and User %s haven't chat yet", userOne, userTwo));
        Message message = messageRepository.findLatestMessageByConversationId(conversation.getId()).orElse(null);
        if(message == null) return ConversationConvert.INSTANCE.convert(conversation);
        return ConversationConvert.INSTANCE.convert(conversation, message, profileApi.getUserById(message.getSenderId()));
    }

}
