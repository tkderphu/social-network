package viosmash.controller.vo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import viosmash.enums.PostType;

import java.util.List;

@Data
public class PostUpdatedReqVO {
    @NotNull
    private Long id;
    @NotEmpty
    private String content;
    private List<String> imageUrls;
    private List<String> fileUrls;
    @NotNull
    private PostType postType;
}
