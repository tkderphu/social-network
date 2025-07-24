package com.viosmash.dal.dataobject;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table(name = "medias")
@Data
@Accessors(chain = true)
public class Media implements Persistable<String> {

    @Id
    private String id;
    private String url;
    private String galleryId;
    private String mediaType;
    private LocalDateTime createdDate;
    private Long linkedPostId; //only for post

    @Transient
    private boolean newProduct;

    @Override
    @Transient
    public boolean isNew() {
        return this.newProduct || id == null;
    }

    public Media setAsNew() {
        this.newProduct = true;
        return this;
    }
}
