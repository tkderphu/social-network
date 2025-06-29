package viosmash.pojo.api.post;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.date.DateUtils;
import viosmash.pojo.api.group.GroupDTO;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Accessors(chain = true)
public class PostDTO {
    private Long id;
    private String content;
    private GroupDTO group;
    private UserDTO user;
    private LocalDateTime createdDate;

    public String getTimeAgo() {
        return DateUtils.timeAgo(createdDate);
    }
}
