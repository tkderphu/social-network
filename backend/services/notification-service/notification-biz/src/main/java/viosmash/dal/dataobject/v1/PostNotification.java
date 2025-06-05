package viosmash.dal.dataobject.v1;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tblPostNotification")
@Data
@DiscriminatorValue("POST")
public class PostNotification extends Notification{
    private Long postId;
}
