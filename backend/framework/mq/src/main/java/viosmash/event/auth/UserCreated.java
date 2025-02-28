package viosmash.event.auth;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@Accessors(chain = true)
public class UserCreated {
    private Long userId;
    private String firstName;
    private String lastName;
    private Date dob;
    private String sex;
}
