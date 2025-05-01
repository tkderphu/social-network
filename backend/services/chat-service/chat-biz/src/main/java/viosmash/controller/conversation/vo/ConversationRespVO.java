package viosmash.controller.conversation.vo;

import viosmash.controller.message.vo.MessageRespVO;

import java.time.LocalDateTime;

public class ConversationRespVO {
    private Long id;
    private String nickname;
    private String thumbnail;
    private LocalDateTime createdAt;
    private Boolean isOnline;
    private MessageRespVO latestMessage;
}
