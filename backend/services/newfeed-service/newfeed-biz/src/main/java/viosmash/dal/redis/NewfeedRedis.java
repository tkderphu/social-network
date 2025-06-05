package viosmash.dal.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import viosmash.collection.CollUtils;
import viosmash.json.JsonUtils;
import viosmash.pojo.api.post.PostDTO;

import java.util.List;
import java.util.Set;

import static viosmash.dal.redis.RedisConstant.USER_NEWFEED_KEY;

@Component
@RequiredArgsConstructor
public class NewfeedRedis implements RedisRepo<Long, List<PostDTO>>{
    private final RedisTemplate<String, String> redisTemplate;
    private final PostRedis postRedis;



    @Override
    public RedisTemplate<String, String> redisTemplate() {
        return redisTemplate;
    }


    @Override
    public List<PostDTO> getValue(Long userId) {
        String key = formatKey(userId);
        Set<String> postKeys = redisTemplate.opsForZSet()
                .reverseRange(key, 0, -1); // Reverse for newest first


        return CollUtils.convertList(postKeys, postKey -> {
            PostDTO postDTO = postRedis.getValue(postKey);
            if(postDTO == null) {
                postRedis.clear(postDTO.getId());
            }
            return postDTO;
        }, null, post -> post != null);
    }

    @Override
    public void setValue(Long userId, List<PostDTO> postDTOS) {
        String key = formatKey(userId);
        CollUtils.convertList(postDTOS, (post) -> {
            String postKey = postRedis.formatKey(post.getId());
            postRedis.setValue(post.getId(), post);
            redisTemplate.opsForZSet().add(key, JsonUtils.toStringJson(post), post.getCreatedDate());
            return null;
        });
    }


    @Override
    public String formatKey(Long userId) {
        return String.format(USER_NEWFEED_KEY, userId);
    }
}
