package viosmash.service;

import viosmash.controller.conversation.vo.*;

import java.util.List;

public interface ConversationService {
    String createConversation(Long ownerId, ConversationCreateReq req);
    void updateConversationInfo(ConversationInfoUpdateReqVO req);
    void updatePolicy(ConversationUpdatePolicyReq req);
    List<ConversationRespVO> getListConversation(Long userId, Boolean visible);
    ConversationRespVO getConversationById(String conversationId);
    String getPrivateConversation(Long userOne, Long userTwo);
    int countConversationUnVisible(Long userId);

}
