package viosmash.dal.dataobject;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GroupCoverPhoto {
    private Long id;
    private Long groupId;
    private Long postId;
    private String imageUrl;
    private LocalDateTime createdAt;
}
