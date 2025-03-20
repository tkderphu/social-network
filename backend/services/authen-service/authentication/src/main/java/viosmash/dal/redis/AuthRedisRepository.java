package viosmash.dal.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import viosmash.dal.dataobject.token.AuthAccessToken;
import viosmash.event.notify.forgotpassword.ForgotPasswordEvent;
import viosmash.collection.CollUtils;
import viosmash.date.DateUtils;
import viosmash.json.JsonUtils;

import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Repository
public class AuthRedisRepository {
    private final RedisTemplate<String, String> redisTemplate;


    public void setForgetCode(ForgotPasswordEvent event, int expireMinutes) {
        redisTemplate.opsForValue()
                .set(event.getCode(),
                        JsonUtils.toStringJson(event),
                        expireMinutes,
                        TimeUnit.MINUTES);
    }

    public ForgotPasswordEvent getForgotPasswordEvent(String code) {
        if(this.redisTemplate.hasKey(code)) {
            return JsonUtils.toObject(redisTemplate.opsForValue().get(code), ForgotPasswordEvent.class);
        } else {
            return null;
        }
    }


    public void setToken(AuthAccessToken authAccessToken) {
        String keyAccessToken = formatKey(authAccessToken.getAccessToken());
        long betweenAccessToken = DateUtils.between(authAccessToken.getExpires(), ChronoUnit.SECONDS);
        if(betweenAccessToken > 0) {
            redisTemplate.opsForValue().set(
                    keyAccessToken,
                    JsonUtils.toStringJson(authAccessToken),
                    betweenAccessToken,
                    TimeUnit.SECONDS);
        }
    }

    public AuthAccessToken getToken(String accessToken) {
        String key = formatKey(accessToken);
        String jsonString = redisTemplate.opsForValue().get(key);
        try {
            return JsonUtils.toObject(jsonString, AuthAccessToken.class);
        } catch (Exception e) {
            return null;
        }
    }

    public void removeToken(String accessToken) {
        String key = formatKey(accessToken);
        redisTemplate.delete(accessToken);
    }

    public void removeToken(Collection<AuthAccessToken> authAccessTokens) {
        List<String> accessTokens = CollUtils.convertList(authAccessTokens, AuthAccessToken::getAccessToken);
        if(!CollectionUtils.isEmpty(accessTokens)) {
            accessTokens.forEach(this::removeToken);
        }
    }

    private String formatKey(String key) {
        return String.format(AuthConstant.ACCESS_TOKEN, key);
    }


}

