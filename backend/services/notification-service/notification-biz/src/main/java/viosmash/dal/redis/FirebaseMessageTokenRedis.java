package viosmash.dal.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import viosmash.repo.RedisRepo;

@Service
@RequiredArgsConstructor
public class FirebaseMessageTokenRedis implements RedisRepo<String, String> {
    private final RedisTemplate<String, String> redisTemplate;
    @Override
    public RedisTemplate<String, String> redisTemplate() {
        return redisTemplate;
    }

    @Override
    public String getValue(String id) {
        return "";
    }

    @Override
    public void setValue(String id, String objectValue) {

    }

    @Override
    public String formatKey(String id) {
        return "";
    }
}
