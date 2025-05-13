package viosmash.controller.post.vo;

import lombok.Data;

@Data
public class UserChangePassword {
    private String oldPassword;
    private String newPassword;
}
