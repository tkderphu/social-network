package viosmash.controller.conversation.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.controller.message.vo.MessageRespVO;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class ConversationRespVO {
    private Long id;
    private String nickname;
    private String thumbnail;
    private LocalDateTime createdAt;
    private Boolean isOnline;
    private MessageRespVO latestMessage;
}
