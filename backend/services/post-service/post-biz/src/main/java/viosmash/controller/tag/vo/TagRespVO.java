package viosmash.controller.tag.vo;

import lombok.Data;

@Data
public class TagRespVO {
    private Long id;
    private String name;
    private String time;
    private int countPost;
    private int countComment;
}
