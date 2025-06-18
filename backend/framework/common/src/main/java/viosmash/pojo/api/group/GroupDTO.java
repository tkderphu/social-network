package viosmash.pojo.api.group;

import lombok.Data;
import viosmash.pojo.api.profile.UserDTO;
import viosmash.string.StringUtils;

import java.time.LocalDateTime;

@Data
public class GroupDTO {
    private Long id;
    private String name;
    private String groupType;
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
