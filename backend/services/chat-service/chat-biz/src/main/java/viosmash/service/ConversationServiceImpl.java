package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.ConversationCreateReq;
import viosmash.controller.vo.ConversationRespVO;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.UserConversation;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.MessageRepository;
import viosmash.dal.repo.UserConversationRepository;
import viosmash.object.BeanUtil;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@RequiredArgsConstructor
@Service
public class ConversationServiceImpl implements ConversationService{

    private final UserConversationRepository userConversationRepository;
    private final ConversationRepository conversationRepository;
    private final MessageService  messageService;
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
        return CollUtils.convertList(userConversations, uc -> {
            return BeanUtil.copy(getConversation(uc.getId()), ConversationRespVO.class)
                    .setLatestMessage(messageService.getLatestMessage(uc.getConversationId()));
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

}
