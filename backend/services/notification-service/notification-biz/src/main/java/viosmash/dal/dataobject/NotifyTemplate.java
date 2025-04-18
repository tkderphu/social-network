package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.converter.JsonListConverter;

import java.util.List;

@Table(name = "tblNotifyTemplate")
@Entity
@Data
@Accessors(chain = true)
public class NotifyTemplate {
    @Id
    private String id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Convert(converter = JsonListConverter.class)
    private List<String> params;
}
