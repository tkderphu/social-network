package viosmash.controller.post.vo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.validation.annotation.Validated;
import viosmash.post.enums.PostPrivacy;
import viosmash.post.enums.PostType;

import java.util.List;

@Data
public class PostCreateReqVO {
    @NotEmpty
    private String content;
    private Long groupId;
    private List<String> mediaUrls;

    private PostType postType;
    private PostPrivacy postPrivacy = PostPrivacy.PUBLIC;

    private Long sharePostId;
}
