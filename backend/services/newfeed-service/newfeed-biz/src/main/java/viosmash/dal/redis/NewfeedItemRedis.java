package viosmash.dal.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import viosmash.dal.dataobject.NewfeedItem;
import viosmash.string.StringUtils;

@RequiredArgsConstructor
@Component
public class NewfeedItemRedis implements RedisRepo<Long, NewfeedItem>{
    private final RedisTemplate<String, String> redisTemplate;


    @Override
    public RedisTemplate<String, String> redisTemplate() {
        return redisTemplate;
    }

    @Override
    public NewfeedItem getValue(Long aLong) {
        String result = redisTemplate.opsForValue().get(formatKey(aLong));
        if(StringUtils.isEmpty(result)) {
            return null;
        }
        return new NewfeedItem();
    }

    public NewfeedItem getValue(Long userId, Long postId) {
        String key = formatKey(userId) + "_" + formatKey(postId);
        String result = redisTemplate.opsForValue().get(key);
        if(StringUtils.isEmpty(result)) {
            return null;
        }
        return new NewfeedItem();
    }


    @Override
    public void setValue(Long newfeedItemId, NewfeedItem newfeedItem) {
        redisTemplate.opsForValue().set(formatKey(newfeedItemId), "ok");
    }


    public void setValue(Long userId, Long postId) {
        String key = formatKey(userId) + "_" + formatKey(postId);
        redisTemplate.opsForValue().set(key, "ok");
    }


    public void clear(Long userId, Long postId) {
        String key = formatKey(userId) + "_" + formatKey(postId);
        if(redisTemplate.hasKey(key)) {
            redisTemplate.delete(key);
        }
    }

    @Override
    public String formatKey(Long any) {
        return String.format(RedisConstant.NEWFEED_ITEM_KEY, any);
    }
}
