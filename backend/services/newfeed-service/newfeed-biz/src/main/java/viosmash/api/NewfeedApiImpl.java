package viosmash.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.friendship.api.UserApi;
import viosmash.friendship.api.UserDTO;
import viosmash.group.api.GroupApi;
import viosmash.newfeed.api.NewfeedApi;
import viosmash.pojo.CommonResult;
import viosmash.post.api.PostApi;
import viosmash.post.api.PostDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class NewfeedApiImpl implements NewfeedApi {

    private final UserApi userApi;
    private final PostApi postApi;
    private final GroupApi groupApi;
    @Override
    @PutMapping
    @Async
    public CommonResult<Boolean> updateNewFeed(PostDTO postDTO) {
        CommonResult<List<UserDTO>> userResp = userApi.getListRecommendUser(postDTO.getUser().getId());
        if(userResp.getCode() != 200) {
            log.warn("[updateNewFeed(post: {}) -> error when fetch recommendation user]", postDTO);
            throw new RuntimeException();
        }

        CommonResult<List<UserDTO>> memberResp = null;
        if(memberResp.getCode() != null) {
            log.warn("[updateNewFeed(post: {}) -> error when fetch members ]", postDTO);
            throw new RuntimeException();
        }



        return null;
    }
}
