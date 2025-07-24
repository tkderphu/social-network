package com.viosmash.dal.dataobject;

import com.viosmash.enums.GalleryType;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Table;


@Table(name = "galleries")
@Data
@Accessors(chain = true)
public class Gallery implements Persistable<String> {
    @Id
    private String id;
    private String type;  //user, group, conversation
    private String typeId;

    @Transient
    private boolean newProduct;

    @Override
    @Transient
    public boolean isNew() {
        return this.newProduct || id == null;
    }

    public Gallery setAsNew() {
        this.newProduct = true;
        return this;
    }
}
