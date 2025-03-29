package viosmash.service;

import viosmash.controller.vo.MessageReqVO;
import viosmash.controller.vo.MessageRespVO;
import viosmash.dal.dataobject.Message;
import viosmash.pojo.PageResult;

import java.util.List;

public interface MessageService {
    Message createMessage(MessageReqVO req);
    PageResult<Message> getPageMessage(int page, int limit, Long conversationId);

    MessageRespVO getLatestMessage(Long conversationId);
}
