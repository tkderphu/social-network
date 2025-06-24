package viosmash.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import viosmash.dal.repo.PostRepository;
import viosmash.object.BeanUtil;
import viosmash.pojo.api.post.PostDTO;
import viosmash.post.api.PostApi;
import viosmash.service.PostServiceImpl;

import java.util.Collection;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(PostApi.PREFIX)
@RequiredArgsConstructor
public class PostApiImpl implements PostApi {

    private final PostServiceImpl postService;


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

}
