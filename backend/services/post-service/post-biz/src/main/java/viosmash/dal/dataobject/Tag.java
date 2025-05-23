package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Table(name = "tblTag")
@Entity
@Data
@Accessors(chain = true)
public class Tag {

    @Id
    private String name;

    private LocalDateTime createdAt;

}
