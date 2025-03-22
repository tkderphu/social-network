package viosmash.controller.vo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.validation.annotation.Validated;
import viosmash.enums.PostType;

import java.util.List;

@Validated
@Data
public class PostCreateReqVO {
    @NotEmpty
    private String content;
    @NotNull
    private Long userId;

    private Long groupId;

    private List<String> imageUrls;
    private List<String> fileUrls;

    @NotNull
    private PostType postType;

    private Long sharePostId;

    private Boolean postOnWall;
}
