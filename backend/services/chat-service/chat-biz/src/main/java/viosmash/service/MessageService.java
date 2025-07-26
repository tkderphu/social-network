package viosmash.service;

import viosmash.controller.message.vo.MessageCreateReqVO;
import viosmash.controller.message.vo.MessageRespVO;

import java.util.List;
import java.util.Map;

public interface MessageService {
    void createMessage(MessageCreateReqVO req);

    List<MessageRespVO> getListMessage(String conversationId, Long beforeMessageId, int limit);

    List<MessageRespVO> getListMessage(String conversationId);


    long countTotalUnreadMessage(Long userId);
    Map<String, Long> getUnreadMessageCountPerConversation(Long userId);

    void updateReadMessage(Long userId, Long conversationId);
}
