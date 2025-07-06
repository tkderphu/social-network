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

    /**
     *
     * @param userId: @currentUserId
     * @param type: newfeed for user or group
     * @param page
     * @param limit
     * @param sort: => 0: hot score, 1: newest
     * @return
     */
    List<PostRespVO> getNewFeeds(Long userId, String type, int page, int limit, int sort);

    /**
     *
     * @param id: groupId
     * @param page
     * @param limit
     * @param type: 0 -> hot, 1 -> newest
     * @return
     */
    List<PostRespVO> getListPostByGroupId(Long id, int page, int limit, int type);

    List<PostRespVO> getListPostByUserIdAndGroupId(Long userId, Long groupId, int page, int limit);

    List<PostRespVO> getListPostPendingInGroup(Long groupId, int page, int limit);


    /**
     * Handle update visible post
     * @param postId: postId
     * @param isAccept: true => accept, false => reject
     */
    void updateVisiblePost(Long postId, Boolean isAccept);

}
