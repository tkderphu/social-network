package viosmash.controller.bookmark.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import viosmash.controller.post.vo.PostRespVO;

import java.time.LocalDateTime;

@Data
public class BookmarkRespVO {
    private Long id;

    @JsonIgnore
    private LocalDateTime bookmarkedAt;
    private String time;
    private PostRespVO post;
}
