package viosmash.api.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.dal.dataobject.AuthAccessToken;
import viosmash.object.BeanUtil;
import viosmash.service.token.AuthTokenService;

@RestController
@RequestMapping(TokenApi.PREFIX)
@RequiredArgsConstructor
public class TokenApiImpl implements TokenApi{
    private final AuthTokenService authTokenService;
    @Override
    @PutMapping("/refresh")
    public AuthTokenDTO refreshAccessToken(String refreshToken) {
        return null;
    }

    @Override
    @GetMapping("/check")
    public AuthTokenDTO checkAccessToken(@RequestParam("accessToken") String accessToken) {
        try {
            AuthAccessToken authAccessToken = this.authTokenService.getAccessToken(accessToken);
            return BeanUtil.copy(authAccessToken, AuthTokenDTO.class);
        } catch (Exception ex) {
            return null;
        }
    }
}
