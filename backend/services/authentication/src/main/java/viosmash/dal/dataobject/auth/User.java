package viosmash.dal.dataobject.auth;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class User {
    private Long id;
    private String email;
    private String password;

    private Boolean isLocked;
    private Boolean isOnline;

}
