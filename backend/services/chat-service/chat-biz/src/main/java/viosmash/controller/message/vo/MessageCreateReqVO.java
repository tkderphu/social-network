package viosmash.controller.message.vo;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class MessageCreateReqVO {
    private Long senderId;
    private Long toUserId;
    private String conversationId;
    @NotEmpty
    private String message;
    private List<String> images;
    private List<String> files;
}
