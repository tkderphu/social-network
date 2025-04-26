package viosmash.service;

import viosmash.controller.vo.MessageReqVO;
import viosmash.controller.vo.MessageRespVO;
import viosmash.dal.dataobject.Message;
import viosmash.pojo.PageResult;

import java.util.List;

public interface MessageService {
    void createMessage(MessageReqVO req);
    List<MessageRespVO> getListMessage(Long conversationId, Long beforeMessageId, int limit);
}
