package viosmash.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import viosmash.collection.CollUtils;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.dal.repo.PostRepository;
import viosmash.exception.ServiceException;
import viosmash.object.BeanUtil;
import viosmash.pojo.api.post.PostDTO;
import viosmash.post.api.PostApi;
import viosmash.service.PostService;
import viosmash.service.PostServiceImpl;

import java.awt.print.Pageable;
import java.util.Collection;
import java.util.List;

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
    @Transactional(rollbackFor = ServiceException.class)
    public void updateDisablePostByUserAndGroup(Long userId, Long groupId, boolean disable) {
        this.postRepository.updateDisableByUserIdAndGroupId(
                userId,
                groupId,
                disable
        );
    }

}
