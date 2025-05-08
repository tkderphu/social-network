package viosmash.dal.redis;

import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;

public interface RedisRepo<ID ,ObjectValue> {
    RedisTemplate<String, String> redisTemplate();

    ObjectValue getValue(ID id);
    void setValue(ID id, ObjectValue objectValue);

      String formatKey(ID id);

    default void clear(ID id) {
        String key = formatKey(id);
        if(redisTemplate().hasKey(key)) {
            redisTemplate().delete(key);
        }
    }
}
