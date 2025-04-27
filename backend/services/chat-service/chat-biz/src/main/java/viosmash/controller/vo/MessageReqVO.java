package viosmash.controller.vo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import viosmash.core.utils.SecurityUtils;

import java.util.List;

@Data
public class MessageReqVO {


    private Long senderId;

    private Long conversationId;
    private Long toUserId;

    @NotEmpty
    private String message;


    private List<String> images;
    private List<String> files;
}
