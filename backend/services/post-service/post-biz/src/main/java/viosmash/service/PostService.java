package viosmash.service;

import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.controller.post.vo.PostUpdatedReqVO;
import viosmash.dal.dataobject.Post;
import viosmash.pojo.PageResult;

import java.util.List;

public interface PostService {
    Post createPost(Long userId, PostCreateReqVO req);
    Post updatePost(Long postId, PostCreateReqVO req);
    PageResult<PostRespVO> getListPostByUserId(Long userId, int page, int limit);
    PostRespVO getPostById(Long postId);
    void deletePost(Long postId);


    List<Post> getNewFeeds(Long userId);

}
