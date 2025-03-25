package viosmash.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.controller.vo.PostCreateReqVO;
import viosmash.controller.vo.PostUpdatedReqVO;
import viosmash.dal.dataobject.Post;
import viosmash.dal.repo.PostRepository;
import viosmash.object.BeanUtil;

import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;

    @Override
    public Post createPost(@Valid PostCreateReqVO postCreateReq) {
        Post post = BeanUtil.copy(postCreateReq, Post.class);
        this.postRepository.save(post);
        return post;
    }

    @Override
    public Post updatePost(PostUpdatedReqVO postUpdateReq) {
        Post post = getPostById(postUpdateReq.getId())
                .setPostType(postUpdateReq.getPostType())
                .setContent(postUpdateReq.getContent())
                .setFileUrls(postUpdateReq.getFileUrls())
                .setImageUrls(postUpdateReq.getImageUrls());
        postRepository.save(post);
        return post;
    }

    @Override
    public List<Post> getListPostByUserId(Long userId) {
        return this.postRepository.findAllByUserId(userId);
    }

    @Override
    public Post getPostById(Long postId) {
        return this.postRepository.findById(postId)
                .orElseThrow(() -> exception(404, "post not found"));
    }

    @Override
    public int countSharePost(Long postId) {
        return this.postRepository.countAllBySharePostId(postId);
    }

    @Override
    public void deletePost(Long postId) {
        this.postRepository.deleteAllBySharePostId(postId);
        this.postRepository.deleteById(postId);
    }
}
