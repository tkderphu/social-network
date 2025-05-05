package viosmash.profile.api;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String avatar;
    private Boolean isOnline;
}
