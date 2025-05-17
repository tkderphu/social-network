package viosmash.service;

import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.controller.post.vo.PostUpdatedReqVO;
import viosmash.dal.dataobject.Post;
import viosmash.pojo.PageResult;

public interface PostService {
    Post createPost(PostCreateReqVO req);
    Post updatePost(Long postId, PostCreateReqVO req);
    PageResult<PostRespVO> getListPostByUserId(Long userId, int page, int limit);
    PostRespVO getPostById(Long postId);
    void deletePost(Long postId);
}
