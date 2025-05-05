package viosmash.controller.post.vo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
@Data
public class UserUpdateInfoReqVO {
    @NotEmpty(message = "Your firstname can't be empty")
    private String firstName;
    @NotEmpty(message = "Your lastname can't be empty")
    private String lastName;

    private String phoneNumber;
    @NotNull
    @NotNull(message = "Please choose your gender")
    private Boolean isMale;

    private String bio;
    private Date dateOfBirth;


}
