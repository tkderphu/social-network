package viosmash.controller.message.vo;

import lombok.Data;
import viosmash.api.UserDTO;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class MessageRespVO {
    private Long id;

    private UserDTO sender;

    private String message;

    private List<String> images;

    private List<String> files;

    private LocalDateTime createdAt;
}
