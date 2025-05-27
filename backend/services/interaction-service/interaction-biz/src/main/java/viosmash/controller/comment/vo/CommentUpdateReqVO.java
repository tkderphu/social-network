package viosmash.controller.comment.vo;

import lombok.Data;

import java.util.List;

@Data
public class CommentUpdateReqVO {
    private String content;
    private List<String> mediaUrls;
}
