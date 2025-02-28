package viosmash.service.token;

import viosmash.dal.dataobject.auth.User;
import viosmash.dal.dataobject.token.AuthAccessToken;

public interface AuthTokenService {

    AuthAccessToken createAccessToken(User user);

    AuthAccessToken getAccessToken(String accessToken);

    AuthAccessToken refreshAccessToken(String refreshToken);

    AuthAccessToken removeAccessToken(String accessToken);
}
