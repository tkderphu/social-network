package viosmash.dal.dataobject.auth;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Entity
@Table(name = "auth_users")
public class User {
    @Id
    private Long id;
    private String email;
    private String password;

    private Boolean isLocked;
    private Boolean isOnline;

}
