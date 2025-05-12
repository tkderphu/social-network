package viosmash.dal.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;

import static viosmash.exception.utils.ServiceUtils.exception;

@RequiredArgsConstructor
@Repository
public class ForgotCodeRedis {
    private final RedisTemplate<String, String> redisTemplate;
    @Value("${spring.redis.timeToLive}")
    private int timeToLive;
    public void set(String email, String code) {
        redisTemplate.opsForValue().set(formatKey(email), code, Duration.ofMinutes(timeToLive));
    }

    public String get(String email) {
        String key = formatKey(email);
        if(redisTemplate.hasKey(key)) {
            return redisTemplate.opsForValue().get(key);
        }
        throw exception(400, "your forgot code invalid");
    }

    public String formatKey(String email) {
        String commonKey = "%s_FORGOT_CODE";
        return String.format(commonKey, email);
    }
}
