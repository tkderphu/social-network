package viosmash.controller.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.dal.dataobject.Conversation;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class ConversationRespVO {
    private Long id;
    private String name;
    private String imageUrl;
    private Conversation.ConversationType type;
    private LocalDateTime createdAt;
    private MessageRespVO latestMessage;
}
