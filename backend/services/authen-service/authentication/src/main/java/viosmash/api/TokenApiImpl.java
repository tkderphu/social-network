package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.dal.dataobject.token.AuthAccessToken;
import viosmash.service.token.AuthTokenService;
import viosmash.utils.object.BeanUtil;

@Service
@RequiredArgsConstructor
public class TokenApiImpl implements TokenApi{
    private final AuthTokenService authTokenService;
    @Override
    public AuthTokenDTO getAccessToken(String accessToken) {
        AuthAccessToken authAccessToken = authTokenService.getAccessToken(accessToken);
        return BeanUtil.copy(authAccessToken, AuthTokenDTO.class);
    }
}
