package viosmash.service;

import viosmash.controller.post.vo.PagingUserPostReqVO;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.controller.post.vo.PostUpdatedReqVO;
import viosmash.dal.dataobject.Post;
import viosmash.pojo.PageResult;

public interface PostService {
    Post createPost(PostCreateReqVO postCreateReq);
    Post updatePost(PostUpdatedReqVO postUpdateReq);
    PageResult<PostRespVO> getListPostByUserId(PagingUserPostReqVO req);
    PostRespVO getPostById(Long postId);
    void deletePost(Long postId);

}
