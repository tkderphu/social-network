package viosmash.controller.post.vo.message;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class NotifyMessageRespVO {
    private String id;
    private LocalDateTime createdAt;
    private Boolean read;
    private String template;
    private String content;
    private Map<String, Object> templateParams;
}
