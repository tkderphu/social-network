package viosmash.controller.auth.vo;

import lombok.Data;

@Data
public class AuthChangePasswordReqVO {
    private String oldPassword;
    private String newPassword;
}
