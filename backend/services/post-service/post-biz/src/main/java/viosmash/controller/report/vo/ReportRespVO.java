package viosmash.controller.report.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReportRespVO {
    private Long id;
    private String reason;
    private Long postId;
    private LocalDateTime reportedAt;

    private String time;

}
