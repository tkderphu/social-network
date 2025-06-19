package viosmash.service;

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


    List<Post> getNewFeeds(Long userId);

    /**
     *
     * @param id: groupId
     * @param page
     * @param limit
     * @param sort: 0 -> hot, 1 -> newest
     * @return
     */
    List<PostRespVO> getListPostByGroupId(Long id, int page, int limit, int sort);
}
