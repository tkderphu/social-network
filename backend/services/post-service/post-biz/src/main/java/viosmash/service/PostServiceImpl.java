package viosmash.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viosmash.group.api.GroupApi;
import viosmash.collection.CollUtils;
import viosmash.controller.post.vo.PagingUserPostReqVO;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.controller.post.vo.PostUpdatedReqVO;
import viosmash.dal.dataobject.Post;
import viosmash.dal.repo.PostRepository;
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
    public Post updatePost(PostUpdatedReqVO postUpdateReq) {
//        Post post = getPostById(postUpdateReq.getId())
//                .setPostType(postUpdateReq.getPostType())
//                .setContent(postUpdateReq.getContent())
//                .setFileUrls(postUpdateReq.getFileUrls())
//        postRepository.save(post);
        return null;
    }

    @Override
    public PageResult<PostRespVO> getListPostByUserId(PagingUserPostReqVO req) {
        Pageable pageable = PageRequest.of(
                req.getPage() - 1,
                req.getLimit(),
                Sort.by("createdDate").descending()
        );

        Page<Object[]> page = postRepository.findAllByUserId(req.getUserId(), pageable);
        List<PostRespVO> posts = CollUtils.convertList(page.getContent(), objects -> {
            Post post = (Post) objects[0];
            return BeanUtil.copy(post, PostRespVO.class)
                    .setNumberOfShare((Integer) objects[2])
                    .setUser(userApi.getUserById(post.getUserId()))
                    .setGroup(groupApi.getGroup(post.getGroupId()))
                    .setNumReaction((Integer) objects[1])
                    .setNumComment((Integer) objects[3]);
        });

        return new PageResult<>(req.getPage(), req.getLimit(), posts, page.getTotalPages()) ;
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
