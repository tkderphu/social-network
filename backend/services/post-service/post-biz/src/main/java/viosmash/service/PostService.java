package viosmash.service;

import viosmash.controller.vo.PostCreateReqVO;
import viosmash.dal.dataobject.Post;

import java.util.List;

public interface PostService {
    Post createPost(PostCreateReqVO postCreateReq);
    Post updatePost(PostCreateReqVO postUpdateReq);
    List<Post> getListPostByUserId(Long userId);
    Post getPostById(Long postId);
    int countSharePost(Long postId);
    void deletePost(Long postId);
}
