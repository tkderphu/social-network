package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import viosmash.collection.CollUtils;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.NewfeedItem;
import viosmash.dal.redis.NewfeedItemRedis;
import viosmash.dal.redis.NewfeedRedis;
import viosmash.dal.repo.NewfeedItemRepository;
import viosmash.newfeed.enums.ApiConstant;
import viosmash.pojo.CommonResult;
import viosmash.post.api.PostApi;
import viosmash.pojo.api.post.PostDTO;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(ApiConstant.PREFIX_APP)
public class NewfeedController {
    private final NewfeedItemRedis newfeedItemRedis;
    private final NewfeedRedis newfeedRedis;
    private final NewfeedItemRepository newfeedItemRepository;
    private final PostApi postApi;
    
    @GetMapping
    public CommonResult<List<PostDTO>> getNewfeed(@RequestParam(value = "limit", defaultValue = "50") int limit) {
        Long userId = SecurityUtils.getLoginUserMemberId();

        List<PostDTO> newfeeds = newfeedRedis.getValue(userId);
        if(CollectionUtils.isEmpty(newfeeds)) {
            List<NewfeedItem> newfeedItems = newfeedItemRepository.findAllNewfeedItem(userId, limit);
            newfeeds = postApi.getListPostByIds(CollUtils.convertList(
                    newfeedItems,
                    newfeedItem -> newfeedItem.getPostId()
            ));
            newfeedRedis.setValue(userId, newfeeds);
            CollUtils.convertList(newfeeds, post -> {
                newfeedItemRedis.setValue(post.getUser().getId(), post.getId());
                return null;
            });
            return CommonResult.success(newfeeds);
        }

        newfeeds = CollUtils.convertList(newfeeds, feedItem -> feedItem, (post) -> {
           if(newfeedItemRedis.getValue(post.getUser().getId(), post.getId()) != null) {
               newfeedItemRedis.clear(post.getUser().getId(), post.getId());
               return false;
           }
           return true;
        });

        if(newfeeds.size() < limit) {
            List<NewfeedItem> newfeedItems = newfeedItemRepository.findAllNewfeedItem(userId, limit - newfeeds.size());
            newfeeds.addAll(postApi.getListPostByIds(CollUtils.convertList(
                    newfeedItems,
                    newfeedItem -> newfeedItem.getPostId()
            )));
        }


        CollUtils.convertList(newfeeds, post -> {
            newfeedItemRedis.setValue(post.getUser().getId(), post.getId());
            return null;
        });

        return CommonResult.success(newfeeds);
    }
}
