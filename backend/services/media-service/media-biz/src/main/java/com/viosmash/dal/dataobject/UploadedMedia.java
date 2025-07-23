package com.viosmash.dal.dataobject;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table(name = "uploadedMedia")
@Accessors(chain = true)
public class UploadedMedia implements Persistable<String> {
    @Id
    private String id;
    private String url;
    private Long userId;
    private String resourceType; // image | video


    @Transient
    private boolean newProduct;

    @Override
    @Transient
    public boolean isNew() {
        return this.newProduct || id == null;
    }

    public UploadedMedia setAsNew() {
        this.newProduct = true;
        return this;
    }
}
