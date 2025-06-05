package viosmash.pojo.api.group;

import lombok.Data;

@Data
public class GroupDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private String groupType;
    private Integer members;

    private Boolean enableAutoAcceptMember;
    private Boolean enableAutoReviewPost;
}
