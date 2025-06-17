package viosmash.controller.vo;

import lombok.Data;

@Data
public class UserUpdateNewPassword {
    private String newPassword;
    private String codeForgotPassword;
}
