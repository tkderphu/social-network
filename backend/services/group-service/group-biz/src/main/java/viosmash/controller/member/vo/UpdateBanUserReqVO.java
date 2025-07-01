package viosmash.controller.member.vo;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UpdateBanUserReqVO {
    private Long userId;
    private List<Long> groupIds;
    private LocalDateTime banUtil;
    private Boolean unban;
}
