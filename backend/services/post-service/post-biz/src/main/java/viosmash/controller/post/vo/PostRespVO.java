package viosmash.controller.post.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.date.DateUtils;
import viosmash.pojo.api.group.GroupDTO;
import viosmash.post.enums.PostPrivacy;
import viosmash.post.enums.PostType;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Accessors(chain = true)
public class PostRespVO {


    private Long id;
    private String content;
    private UserDTO user;
    private GroupDTO group;
    private List<String> mediaUrls;
    private PostType postType;
    private PostPrivacy postPrivacy;
    private PostRespVO sharePost;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private int votes;
    private int comments;
    private int shares;
    private String time;

    public String getTime() {
        return DateUtils.timeAgo(createdDate);
    }
}
