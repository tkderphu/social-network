package viosmash.controller.auth.vo;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.Date;

@Data
public class AuthRegisterReqVO {
    /**
     * User authentication
     */
    @NotEmpty
    private String email;
    @NotEmpty
    private String password;


    /**
     * User profile
     */

    private String firstName;
    private String lastName;
    private Date dob;
    private String sex;
}
