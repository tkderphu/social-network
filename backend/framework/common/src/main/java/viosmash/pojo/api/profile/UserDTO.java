package viosmash.pojo.api.profile;

import lombok.Data;

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

    public String getFullName() {
        return firstName + " " + lastName;
    }
}
