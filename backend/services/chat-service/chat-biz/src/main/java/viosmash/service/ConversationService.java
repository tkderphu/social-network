package viosmash.service;

import viosmash.controller.conversation.vo.*;

import java.util.List;

public interface ConversationService {
    Long createConversation(ConversationCreateReq req);
    void updateNickname(ConversationUpdateNicknameReq req);
    void updateThumbnail(ConversationUpdateThumbnailReq req);
    void updatePolicy(ConversationUpdatePolicyReq req);
    List<ConversationRespVO> getListConversation(Long userId);
}
