package com.viosmash.controller.vo;

import lombok.Data;

@Data
public class MediaReqVO {
    private String id;
    private String url;
    private String typeId;
    private String type; //user, conversation, group
    private String fileType;
    private Long linkedPostId;
}
