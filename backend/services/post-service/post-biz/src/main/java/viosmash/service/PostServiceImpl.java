package viosmash.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viosmash.collection.CollUtils;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.dal.dataobject.Post;
import viosmash.dal.repo.PostRepository;
import viosmash.exception.Exceptional;
import viosmash.group.api.GroupApi;
import viosmash.interaction.api.InteractionApi;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;
import viosmash.profile.api.UserApi;

import java.time.LocalDateTime;
import java.util.function.Supplier;

import static viosmash.exception.Exceptional.process;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final UserApi userApi;
    private final GroupApi groupApi;
    private final InteractionApi interactionApi;
    @Override
    public Post createPost(Long userId, @Valid PostCreateReqVO postCreateReq) {
        Post post = BeanUtil.copy(postCreateReq, Post.class)
                .setUserId(userId).setCreatedDate(LocalDateTime.now());
        this.postRepository.save(post);
        return post;
    }

    @Override
    public Post updatePost(Long postId, PostCreateReqVO req) {
        return null;
    }


    @Override
    public PageResult<PostRespVO> getListPostByUserId(Long userId, int pageNumber, int limit) {
        Pageable pageable = PageRequest.of(
                pageNumber - 1,
                limit,
                Sort.by("createdDate").descending()
        );

        Page<Post> page = postRepository.findAllByUserId(userId, pageable);

        return new PageResult<>(pageNumber, limit, CollUtils.convertList(page.getContent(), post -> {
            return BeanUtil.copy(post, PostRespVO.class)
                    .setUser(process(post.getUserId(), userApi::getUserById))
                    .setGroup(process(post.getGroupId(), groupApi::getGroup))
                    .setSharePost(getPostById(post.getSharePostId()))
                    .setPostStats(process(post.getId(), interactionApi::countInteraction));
        }));
    }


    @Override
    public PostRespVO getPostById(Long postId) {
         return null;
    }

    @Override
    public void deletePost(Long postId) {
        this.postRepository.deleteAllBySharePostId(postId);
        this.postRepository.deleteById(postId);
    }
}
