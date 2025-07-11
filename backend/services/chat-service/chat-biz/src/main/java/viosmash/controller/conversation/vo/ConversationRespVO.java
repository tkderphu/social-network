package viosmash.controller.conversation.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.controller.message.vo.MessageRespVO;
import viosmash.dal.dataobject.ConversationType;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class ConversationRespVO {
    private String id;
    private String nickname;
    private String thumbnail;
    private LocalDateTime createdAt;
    private Boolean online;
    private MessageRespVO latestMessage;
    private ConversationType conversationType;
}
