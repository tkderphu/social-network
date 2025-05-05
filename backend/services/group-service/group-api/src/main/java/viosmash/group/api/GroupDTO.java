package viosmash.group.api;

import lombok.Data;
import viosmash.group.enums.GroupType;

@Data
public class GroupDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private GroupType groupType;
    private Integer members;

    private Boolean enableAutoAcceptMember;
    private Boolean enableAutoReviewPost;
}
