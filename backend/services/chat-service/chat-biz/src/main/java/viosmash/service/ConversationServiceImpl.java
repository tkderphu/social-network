package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.ConversationCreateReq;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.UserConversation;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.UserConversationRepository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@RequiredArgsConstructor
@Service
public class ConversationServiceImpl implements ConversationService{

    private final UserConversationRepository userConversationRepository;
    private final ConversationRepository conversationRepository;
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
    public List<Conversation> getListConversation(Long userId) {
        return this.conversationRepository.findAll(Sort.by("createdAt").descending());
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
