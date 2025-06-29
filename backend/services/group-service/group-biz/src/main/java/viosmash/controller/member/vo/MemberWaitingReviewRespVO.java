package viosmash.controller.member.vo;

import lombok.Data;
import viosmash.date.DateUtils;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;

@Data
public class MemberWaitingReviewRespVO {

    private Long id;

    private UserDTO user;
    private LocalDateTime requestedDate;
    public String getTimeAgo() {
        return DateUtils.timeAgo(requestedDate);
    }
}
