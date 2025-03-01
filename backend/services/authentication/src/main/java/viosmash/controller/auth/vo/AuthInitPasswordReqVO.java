package viosmash.controller.auth.vo;

import lombok.Data;

@Data
public class AuthInitPasswordReqVO {
    private String code;
    private String newPassword;
}
