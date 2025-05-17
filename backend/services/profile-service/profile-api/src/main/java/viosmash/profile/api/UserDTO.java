package viosmash.profile.api;

import lombok.Data;
import lombok.ToString;

@Data
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String avatar;
    private Boolean isOnline;

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                '}';
    }
}
