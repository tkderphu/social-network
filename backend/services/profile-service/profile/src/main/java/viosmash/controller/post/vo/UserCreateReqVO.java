package viosmash.controller.post.vo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserCreateReqVO {

    @NotEmpty(message = "Your firstname can't be empty")
    private String firstName;
    @NotEmpty(message = "Your lastname can't be empty")
    private String lastName;

    @NotNull(message = "Please choose your gender")
    private Boolean isMale;

    @NotEmpty(message = "Your email can't be empty")
    private String email;

    @Size(message = "Your password must equal greater than 8", min = 8)
    private String password;
}
