package viosmash;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class LoginUser {
    private String accessToken;
    private String refreshToken;

    private long expires;
    private Long userId;


    @JsonIgnore
    public boolean isExpired() {
        return expires < System.currentTimeMillis();
    }
}
