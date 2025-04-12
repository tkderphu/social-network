package viosmash.event.auth;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@Accessors(chain = true)
@ToString
public class UserCreated {
    private Long userId;
    private String firstName;
    private String lastName;
    private Date dob;
    private String sex;
}
