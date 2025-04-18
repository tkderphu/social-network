package viosmash.dal.dataobject;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

@Table(name = "tblFirebaseMessageToken")
@Accessors(chain = true)
@Data
@Entity
public class FirebaseMessageToken {
    @Id
    private Long userId;
    private String token;
}
