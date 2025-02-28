package viosmash.controller.auth.vo;

import lombok.Data;

import java.util.Date;

@Data
public class AuthLoginReqVO {

    /**
     * User authentication
     */
    private String email;
    private String password;


}
