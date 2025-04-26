package viosmash.service;

import viosmash.controller.vo.ConversationCreateReq;
import viosmash.controller.vo.ConversationRespVO;
import viosmash.dal.dataobject.Conversation;

import java.util.Collection;
import java.util.List;

public interface ConversationService {

    Conversation createConversation(ConversationCreateReq req);
    List<ConversationRespVO> getListConversation(Long userId);
    Conversation getConversation(Long id);

    /**
     * this method only apply for Conversation is type: MANY_MANY
     */
    void addUsersToGroup(Long conversationId, Collection<Long> userIds);

    ConversationRespVO getConversation(Long userOne, Long userTwo);
}
