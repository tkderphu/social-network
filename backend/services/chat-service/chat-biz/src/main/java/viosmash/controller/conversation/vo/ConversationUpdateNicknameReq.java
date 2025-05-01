package viosmash.controller.conversation.vo;

import lombok.Data;

@Data
public class ConversationUpdateNicknameReq {
    private Long conversationId;
    private String nickname;
}
