package viosmash.controller.member.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BanUserReqVO {
    private Long userId;
    private Long groupId;
    private LocalDateTime banUtil;
}
