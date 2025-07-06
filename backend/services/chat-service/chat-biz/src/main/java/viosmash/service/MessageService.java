package viosmash.service;

import viosmash.controller.message.vo.MessageCreateReqVO;
import viosmash.controller.message.vo.MessageRespVO;

import java.util.List;

public interface MessageService {
    void createMessage(MessageCreateReqVO req);
    List<MessageRespVO> getListMessage(String conversationId, Long beforeMessageId, int limit);

    List<MessageRespVO> getListMessage(String conversationId);


    int countUnreadMessage(Long userId);

}
