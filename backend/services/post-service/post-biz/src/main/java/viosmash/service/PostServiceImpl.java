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
import viosmash.group.api.GroupApi;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;
import viosmash.profile.api.UserApi;

import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final UserApi userApi;
    private final GroupApi groupApi;

    @Override
    public Post createPost(@Valid PostCreateReqVO postCreateReq) {
        Post post = BeanUtil.copy(postCreateReq, Post.class);
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

        Page<Object[]> page = postRepository.findAllByUserId(userId, pageable);
        List<PostRespVO> posts = CollUtils.convertList(page.getContent(), objects -> {
            Post post = (Post) objects[0];
            return BeanUtil.copy(post, PostRespVO.class)
                    .setNumberOfShare((Integer) objects[2])
                    .setUser(userApi.getUserById(post.getUserId()))
                    .setGroup(groupApi.getGroup(post.getGroupId()))
                    .setNumReaction((Integer) objects[1])
                    .setNumComment((Integer) objects[3]);
        });

        return new PageResult<>(pageNumber, limit, posts, page.getTotalPages()) ;
    }


    @Override
    public PostRespVO getPostById(Long postId) {
         this.postRepository.findById(postId)
                .orElseThrow(() -> exception(404, "post not found"));
         return null;
    }

    @Override
    public void deletePost(Long postId) {
        this.postRepository.deleteAllBySharePostId(postId);
        this.postRepository.deleteById(postId);
    }
}
