package viosmash.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.collection.CollUtils;
import viosmash.dal.dataobject.NewfeedItem;
import viosmash.dal.redis.NewfeedItemRedis;
import viosmash.dal.redis.NewfeedRedis;
import viosmash.dal.redis.PostRedis;
import viosmash.dal.repo.NewfeedItemRepository;
import viosmash.friendship.api.FriendshipApi;
import viosmash.friendship.api.UserDTO;
import viosmash.group.api.GroupApi;
import viosmash.newfeed.api.NewfeedApi;
import viosmash.pojo.CommonResult;
import viosmash.post.api.PostApi;
import viosmash.pojo.api.post.PostDTO;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(NewfeedApi.PREFIX)
public class NewfeedApiImpl implements NewfeedApi {

    private final FriendshipApi friendshipApi;
    private final PostApi postApi;
    private final GroupApi groupApi;
    private final NewfeedItemRepository newfeedItemRepository;
    private final PostRedis postRedis;
    private final NewfeedRedis newfeedRedis;
    private final NewfeedItemRedis newfeedItemRedis;

    @Override
    @PutMapping
    @Async
    public CommonResult<Boolean> updateNewFeed(PostDTO postDTO) {
        if(postDTO.getGroup() != null) {
//            List<UserDTO> membersResp = new CommonResult<>();
//            if(CollectionUtils.isEmpty(membersResp)) {
//                storeNewfeed(postDTO, membersResp);
//            }
            return CommonResult.success(true);
        }
//        List<UserDTO> userResp = friendshipApi.getListRecommendUser(postDTO.getUser().getId());
//        if(!CollectionUtils.isEmpty(userResp)) {
//            storeNewfeed(postDTO, userResp);
//            return CommonResult.success(true);
//        }

        return CommonResult.success(true);
    }

    private void storeNewfeed(PostDTO postDTO, List<UserDTO> userResp) {
        List<NewfeedItem> newfeedItems = newfeedItemRepository.saveAll(CollUtils.convertList(userResp, user -> {
            return new NewfeedItem().setTimeline(new Date(postDTO.getCreatedDate()))
                    .setIsRead(false).setIsAdvertised(0)
                    .setUserId(user.getId()).setPostId(postDTO.getId());
        }));

        postRedis.setValue(postDTO.getId(), postDTO);
        CollUtils.convertList(userResp, user -> {
            newfeedRedis.setValue(user.getId(), List.of(postDTO));
            return null;
        });

        newfeedItemRepository.saveAll(newfeedItems);
    }

    @Override
    @Transactional
    @PutMapping("/user/{userId}/post/{postId}")
    public CommonResult<Boolean> updateRead(Long postId, Long userId) {
        newfeedItemRepository.updateIsRead(postId, userId);
        return CommonResult.success(true);
    }

    @Override
    @PutMapping("/user/{userId}")
    public CommonResult<Boolean> updateNewfeed(Long userId, Collection<PostDTO> posts) {
        List<NewfeedItem> newfeedItems = CollUtils.convertList(posts, post -> {
            return new NewfeedItem().setTimeline(new Date(post.getCreatedDate()))
                    .setIsAdvertised(0).setIsRead(false)
                    .setUserId(userId).setPostId(post.getId());
        });
        newfeedItemRepository.saveAll(newfeedItems);
        return CommonResult.success(true);
    }

    @Override
    @Transactional
    @DeleteMapping("/user/{userId}")
    public CommonResult<Boolean> deleteNewfeed(Long userId, Collection<Long> postIds) {
        CollUtils.convertList(postIds, post -> {
            newfeedItemRepository.deleteByUserIdAndPostId(userId, post);
            return null;
        });
        return null;
    }

}
