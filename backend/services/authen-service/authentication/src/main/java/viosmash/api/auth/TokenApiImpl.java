package viosmash.api.auth;

import org.springframework.web.bind.annotation.RestController;
import viosmash.pojo.CommonResult;

@RestController
public class TokenApiImpl implements TokenApi{
    @Override
    public CommonResult<AuthTokenDTO> refreshAccessToken(String refreshToken) {
        return null;
    }

    @Override
    public CommonResult<AuthTokenDTO> checkAccessToken(String accessToken) {
        return null;
    }
}
