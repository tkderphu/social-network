package viosmash.controller.vo.message;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotifyMessageRespVO {
    private String id;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
    private Boolean read;
    private String content;
}
