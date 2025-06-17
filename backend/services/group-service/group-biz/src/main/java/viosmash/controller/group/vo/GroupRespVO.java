package viosmash.controller.group.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.pojo.api.profile.UserDTO;
import viosmash.group.enums.GroupType;
import viosmash.string.StringUtils;

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
    private Boolean enableNotificationWhenUserRequest;
    private Boolean enableNotificationWhenNewPostComing;
    private String coverPhoto;
    public String getCoverPhoto() {
        if(StringUtils.isEmpty(coverPhoto)) {
            return "https://cdn-icons-png.flaticon.com/512/9572/9572728.png";
        }
        return coverPhoto;
    }
}
