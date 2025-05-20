package viosmash.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import viosmash.BaseTest;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.dal.dataobject.Post;
import viosmash.pojo.PageResult;
import viosmash.random.RandomUtils;

import static org.junit.jupiter.api.Assertions.*;

class PostServiceTest extends BaseTest {

    @Autowired
    private PostService postService;

    @Test
    void createPost() {
        PostCreateReqVO req = RandomUtils.randomObject(PostCreateReqVO.class);
        Post post = postService.createPost(1l, req);


    }

    @Test
    void getListPostByUserId() {
        PostCreateReqVO req = RandomUtils.randomObject(PostCreateReqVO.class);
        Post post = postService.createPost(1l, req);
        postService.createPost(1l, req);
        postService.createPost(1l, req);
        postService.createPost(1l, req);

        PageResult<PostRespVO> listPostByUserId = postService.getListPostByUserId(1l, 1, 20);

        Assertions.assertEquals(listPostByUserId.getData().size(), 4);

    }
}