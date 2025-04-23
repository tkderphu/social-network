package viosmash.service;

import viosmash.controller.vo.MessageReqVO;
import viosmash.controller.vo.MessageRespVO;
import viosmash.dal.dataobject.Message;
import viosmash.pojo.PageResult;

public interface MessageService {
    void createMessage(MessageReqVO req);
    PageResult<Message> getPageMessage(int page, int limit, Long conversationId);

    MessageRespVO getLatestMessage(Long conversationId);

}
