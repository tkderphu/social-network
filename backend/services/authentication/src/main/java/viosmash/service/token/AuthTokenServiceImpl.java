package viosmash.service.token;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import viosmash.dal.dataobject.auth.User;
import viosmash.dal.dataobject.token.AuthAccessToken;
import viosmash.dal.dataobject.token.AuthRefreshToken;
import viosmash.dal.repository.token.AuthAccessTokenRepository;
import viosmash.dal.repository.token.AuthRefreshTokenRepository;
import viosmash.utils.date.DateUtils;

import java.util.Date;
import java.util.UUID;

import static viosmash.constant.ErrorCodeConstant.REFRESH_TOKEN_INVALID;
import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class AuthTokenServiceImpl implements AuthTokenService{

    @Value("${spring.authentication.accessToken.expires}")
    private Integer accessTokenExpires;
    @Value("${spring.authentication.refreshToken.expires}")
    private Integer refreshTokenExpires;

    private final AuthRefreshTokenRepository authRefreshTokenRepository;
    private final AuthAccessTokenRepository authAccessTokenRepository;

    @Override
    public AuthAccessToken createAccessToken(User user) {
        AuthRefreshToken refreshToken = new AuthRefreshToken()
                .setRefreshToken(UUID.randomUUID().toString())
                .setExpires(refreshExpires())
                .setUserId(user.getId());

        AuthAccessToken authAccessToken = new AuthAccessToken()
                .setAccessToken(UUID.randomUUID().toString())
                .setRefreshToken(refreshToken.getRefreshToken())
                .setUserId(user.getId()).setExpires(accessExpires());



        return null;
    }



    @Override
    public AuthAccessToken getAccessToken(String accessToken) {
        return null;
    }

    @Override
    public AuthAccessToken refreshAccessToken(String refreshToken) {
        AuthRefreshToken authRefreshToken = authRefreshTokenRepository
                .findByRefreshToken(refreshToken)
                .orElseThrow(() -> exception(REFRESH_TOKEN_INVALID));

        /**
         * currentDate < expires
         */
        if(DateUtils.before(authRefreshToken.getExpires())) {
            AuthAccessToken authAccessToken = new AuthAccessToken()
                    .setAccessToken(UUID.randomUUID().toString())
                    .setRefreshToken(authRefreshToken.getRefreshToken())
                    .setUserId(authRefreshToken.getUserId())
                    .setExpires(accessExpires());
            this.authAccessTokenRepository.save(authAccessToken);
            return authAccessToken;
        } else {
            throw exception(REFRESH_TOKEN_INVALID);
        }
    }

    @Override
    public AuthAccessToken removeAccessToken(String accessToken) {
        return null;
    }


    private Long refreshExpires() {
        return DateUtils.getCurrentMilliseconds() + refreshTokenExpires;
    }
    private Long accessExpires() {
        return DateUtils.getCurrentMilliseconds() + accessTokenExpires;
    }

}
