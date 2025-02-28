package viosmash.controller.auth.vo;

import lombok.Data;

import java.util.Date;

@Data
public class AuthRegisterReqVO {
    /**
     * User authentication
     */
    private String email;
    private String password;


    /**
     * User profile
     */

    private String firstName;
    private String lastName;
    private Date dob;
    private String sex;
}
