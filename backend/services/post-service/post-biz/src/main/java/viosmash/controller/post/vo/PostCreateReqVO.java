package viosmash.controller.post.vo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.validation.annotation.Validated;
import viosmash.post.enums.PostPrivacy;
import viosmash.post.enums.PostType;

import java.util.List;
import java.util.Set;

@Data
public class PostCreateReqVO {
    @NotEmpty
    private String content;
    private Long groupId;
    private List<String> mediaUrls;
    private Set<String> tagNames;
    private PostType postType;
    private PostPrivacy postPrivacy = PostPrivacy.PUBLIC;

    private Long sharePostId;
}
