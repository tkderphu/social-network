package viosmash.event.notify.forgotpassword;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ForgotPasswordEvent {
    private String email;
    private String code;
}
