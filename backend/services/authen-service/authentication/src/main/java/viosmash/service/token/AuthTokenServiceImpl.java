package viosmash.service.token;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import viosmash.dal.dataobject.auth.User;
import viosmash.dal.dataobject.token.AuthAccessToken;
import viosmash.dal.dataobject.token.AuthRefreshToken;
import viosmash.dal.redis.AuthRedisRepository;
import viosmash.dal.repository.token.AuthAccessTokenRepository;
import viosmash.dal.repository.token.AuthRefreshTokenRepository;
import viosmash.date.DateUtils;

import java.util.UUID;

import static viosmash.constant.ErrorCodeConstant.REFRESH_TOKEN_INVALID;
import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class AuthTokenServiceImpl implements AuthTokenService{

    @Value("${spring.authentication.accessToken.expiresMinute}")
    private Integer accessTokenExpires;
    @Value("${spring.authentication.refreshToken.expiresMinute}")
    private Integer refreshTokenExpires;

    private final AuthRedisRepository authRedisRepository;
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

        this.authAccessTokenRepository.save(authAccessToken);
        this.authRefreshTokenRepository.save(refreshToken);

        this.authRedisRepository.setToken(authAccessToken);
        return authAccessToken;
    }



    @Override
    public AuthAccessToken getAccessToken(String accessToken) {
        AuthAccessToken authAccessToken = authRedisRepository.getToken(accessToken);
        if(authAccessToken == null) {
            authAccessToken = this.authAccessTokenRepository
                    .findByAccessToken(accessToken)
                    .orElse(null);
            if(authAccessToken == null || DateUtils.before(authAccessToken.getExpires())) {
                throw exception(401, "Access token is invalid");
            }
            this.authRedisRepository.setToken(authAccessToken);
        }
        return authAccessToken;
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
            authRedisRepository.setToken(authAccessToken);
            this.authAccessTokenRepository.save(authAccessToken);
            return authAccessToken;
        } else {
            throw exception(REFRESH_TOKEN_INVALID);
        }
    }

    @Override
    @Transactional
    public void removeAccessToken(String accessToken, String refreshToken) {
        this.authAccessTokenRepository.deleteAllByRefreshToken(refreshToken);
        this.authRedisRepository.removeToken(accessToken);
    }

    @Override
    public void removeRefreshToken(String refreshToken) {
        this.authRefreshTokenRepository.deleteByRefreshToken(refreshToken);
    }


    private Long refreshExpires() {
        return DateUtils.getCurrentMilliseconds() + refreshTokenExpires;
    }
    private Long accessExpires() {
        return DateUtils.getCurrentMilliseconds() + accessTokenExpires;
    }

}
