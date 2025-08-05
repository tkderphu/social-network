package viosmash.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import viosmash.dal.repo.PostRepository;
import viosmash.object.BeanUtil;
import viosmash.pojo.api.post.PostDTO;
import viosmash.post.api.PostApi;
import viosmash.post.api.PostUpdateDisableReqVO;
import viosmash.service.PostService;

@Slf4j
@RestController
@RequestMapping(PostApi.PREFIX)
@RequiredArgsConstructor
public class PostApiImpl implements PostApi {

    private final PostService postService;
    private final PostRepository postRepository;

    @Override
    public PostDTO getPostById(Long id) {
        log.info("fetch detail post: {}", id);
        return BeanUtil.copy(postService.getPostById(id), PostDTO.class);
    }



    @Override
    public void updateVote(Long id, Integer votes) {
        log.info("updateVote(post, votes)::({}, {})", id, votes);
        postService.updateVote(id, votes);
    }

    @Override
    public void updateDisablePostByUserAndGroup(PostUpdateDisableReqVO req) {
        log.info("update disable post of (user, group, disable)=({},{}, {})", req.getUserId(), req.getGroupId(), req.getDisable());
        this.postRepository.updateDisableByUserIdAndGroupId(
                req.getUserId(),
                req.getGroupId(),
                req.getDisable()
        );
    }

}
