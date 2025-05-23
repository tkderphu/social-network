package viosmash.controller.bookmark.vo;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookmarkCreateReqVO {
    @NotNull
    private Long postId;
    @NotNull
    private Long seriesId;
}
