package viosmash.dal.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import viosmash.json.JsonUtils;
import viosmash.post.api.PostDTO;
import viosmash.string.StringUtils;

import java.util.concurrent.TimeUnit;

import static viosmash.dal.redis.RedisConstant.POST_KEY;

@Component
@RequiredArgsConstructor
public class PostRedis implements RedisRepo<Long, PostDTO>{
    private final RedisTemplate<String, String> redisTemplate;
    @Value("${spring.redis.redisKeyTimeToLive}")
    private Integer redisKeyTimeToLive;



    @Override
    public RedisTemplate<String, String> redisTemplate() {
        return redisTemplate;
    }


    @Override
    public PostDTO getValue(Long postId) {
        String jsonObject = this.redisTemplate.opsForValue().get(formatKey(postId));
        if(StringUtils.isEmpty(jsonObject)) {
            return null;
        }
        return JsonUtils.toObject(jsonObject, PostDTO.class);
    }


    public PostDTO getValue(String key) {
        String jsonObject = this.redisTemplate.opsForValue().get(key);
        if(StringUtils.isEmpty(jsonObject)) {
            return null;
        }
        return JsonUtils.toObject(jsonObject, PostDTO.class);
    }

    @Override
    public void setValue(Long postId, PostDTO postDTO) {
        String key = formatKey(postId);
        redisTemplate.opsForValue().set(key, JsonUtils.toStringJson(postDTO), redisKeyTimeToLive, TimeUnit.HOURS);
    }

    public String formatKey(Long postId) {
        return String.format(POST_KEY, postId);
    }
}
