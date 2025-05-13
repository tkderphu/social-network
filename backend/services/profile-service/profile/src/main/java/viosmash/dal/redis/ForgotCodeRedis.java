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
    public void set(String code, String email) {
        redisTemplate.opsForValue().set(formatKey(code), email , Duration.ofMinutes(timeToLive));
    }

    public String get(String code) {
        String key = formatKey(code);
        if(redisTemplate.hasKey(key)) {
            return redisTemplate.opsForValue().get(key);
        }
        throw exception(400, "your forgot code invalid");
    }

    public String formatKey(String code) {
        String commonKey = "FORGOT_CODE_%s";
        return String.format(commonKey, code);
    }

    public int getTimeToLive() {
        return timeToLive;
    }

    public void clear(String code) {
        redisTemplate.delete(formatKey(code));
    }
}
