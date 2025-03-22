package viosmash.dal.dataobject;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import viosmash.enums.PostType;

import java.util.List;

@Data
public class Post {
    private Long id;
    private String content;

    private Long userId;

    private Long groupId;

    private List<String> imageUrls;
    private List<String> fileUrls;

    @NotNull
    private PostType postType;

    private Long sharePostId;

    private Boolean postOnWall;
}
