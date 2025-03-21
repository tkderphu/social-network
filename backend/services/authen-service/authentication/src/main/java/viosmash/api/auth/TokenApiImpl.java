package viosmash.api.auth;

import org.springframework.web.bind.annotation.*;
import viosmash.pojo.CommonResult;

import java.util.UUID;

@RestController
@RequestMapping(TokenApi.PREFIX)
public class TokenApiImpl implements TokenApi{
    @Override
    @PutMapping("/refresh")
    public CommonResult<AuthTokenDTO> refreshAccessToken(String refreshToken) {
        return null;
    }

    @Override
    @GetMapping("/check")
    public CommonResult<AuthTokenDTO> checkAccessToken(@RequestParam("accessToken") String accessToken) {
        System.out.println("receive token: " + accessToken);
        AuthTokenDTO authTokenDTO = new AuthTokenDTO();
        authTokenDTO.setAccessToken(UUID.randomUUID().toString());
        authTokenDTO.setRefreshToken(UUID.randomUUID().toString());
        authTokenDTO.setExpires(System.currentTimeMillis());
        authTokenDTO.setUserId(5l);
        return CommonResult.success(authTokenDTO);
    }
}
