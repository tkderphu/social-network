package viosmash.controller.group.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.profile.api.UserDTO;
import viosmash.group.enums.GroupType;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Accessors(chain = true)
public class GroupRespVO {
    private Long id;
    private String name;
    private GroupType groupType;
    private String description;
    private Integer numberOfMembers;
    private LocalDateTime createdAt;
    private UserDTO owner;
    private Boolean enableAutoAcceptMember;
    private Boolean enableAutoReviewPost;
}
