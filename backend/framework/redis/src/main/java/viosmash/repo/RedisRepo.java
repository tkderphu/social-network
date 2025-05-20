package viosmash.repo;

import org.springframework.data.redis.core.RedisTemplate;

public interface RedisRepo<Key ,Value> {
    RedisTemplate<String, String> redisTemplate();

    Value getValue(Key id);
    void setValue(Key id, Value objectValue);

    String formatKey(Key id);

    default void clear(Key id) {
        String key = formatKey(id);
        if(redisTemplate().hasKey(key)) {
            redisTemplate().delete(key);
        }
    }
}
