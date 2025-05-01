package viosmash.service.token;

import viosmash.dal.dataobject.AuthAccessToken;

public interface AuthTokenService {

    AuthAccessToken createAccessToken(Long userId);

    AuthAccessToken getAccessToken(String accessToken);

    AuthAccessToken refreshAccessToken(String refreshToken);

    void removeAccessToken(String accessToken, String refreshToken);

    void removeRefreshToken(String refreshToken);
}
