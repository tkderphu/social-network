package viosmash.controller.post.vo.template;

import lombok.Data;

import java.util.List;

@Data
public class NotifyTemplateRespVO {
    private String id;
    private String name;
    private String content;
    private List<String> params;
}
