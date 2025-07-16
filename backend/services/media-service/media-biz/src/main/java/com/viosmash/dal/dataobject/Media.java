package com.viosmash.dal.dataobject;

import org.springframework.data.relational.core.mapping.Table;

@Table(name = "tblMedia")
public class Media {
    private Long id;
    private String url;

    private Long userId;
    private Long postId;
    private Long groupId;
}
