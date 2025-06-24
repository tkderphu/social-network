package viosmash.service;

import org.springframework.scheduling.annotation.Async;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.dal.dataobject.Post;

import java.util.List;

public interface PostService {
    Post createPost(Long userId, PostCreateReqVO req);
    Post updatePost(Long postId, PostCreateReqVO req);
    List<PostRespVO> getListPostByUserId(Long userId, int page, int limit);
    PostRespVO getPostById(Long postId);
    void deletePost(Long postId);

    @Async
    void updateVote(Long postId, int votes);

    List<PostRespVO> getNewFeeds(Long userId, int page, int limit);

    /**
     *
     * @param id: groupId
     * @param page
     * @param limit
     * @param type: 0 -> hot, 1 -> newest
     * @return
     */
    List<PostRespVO> getListPostByGroupId(Long id, int page, int limit, int type);
}
