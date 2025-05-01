package viosmash.controller.conversation.vo;

import lombok.Data;

@Data
public class ConversationUpdateThumbnailReq {
    private Long conversationId;
    private String thumbnail;
}
