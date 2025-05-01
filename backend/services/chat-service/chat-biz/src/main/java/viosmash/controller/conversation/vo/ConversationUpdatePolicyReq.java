package viosmash.controller.conversation.vo;

import lombok.Data;

@Data
public class ConversationUpdatePolicyReq {
    private Long conversationId;
    private Boolean onlyAdminChat;
    private Boolean onlyAdminInvite;
    private Boolean onlyAdminUpdateNickname;
    private Boolean onlyAdminUpdateThumbnail;
}
