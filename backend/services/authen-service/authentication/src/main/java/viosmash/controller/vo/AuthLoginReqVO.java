package viosmash.controller.vo;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AuthLoginReqVO {

    /**
     * User authentication
     */
    @NotEmpty(message = "email can't empty")
    private String email;
    @NotEmpty(message = "password can't empty")
    private String password;


}
