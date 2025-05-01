package viosmash.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import viosmash.BaseTest;
import viosmash.api.GroupApi;
import viosmash.api.GroupDTO;
import viosmash.api.UserApi;
import viosmash.api.UserDTO;
import viosmash.controller.vo.PostCreateReqVO;
import viosmash.controller.vo.PostRespVO;
import viosmash.dal.dataobject.Post;
import viosmash.dal.repo.PostRepository;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.random.RandomUtils;
import viosmash.service.PostService;

class PostControllerTest extends BaseTest {

    @InjectMocks
    private PostController postController;
    @Autowired
    private PostRepository postRepository;
    @Mock
    private UserApi userApi;
    @Mock
    private PostService postService;
    @Mock
    private GroupApi groupApi;

    private GroupDTO mockGroup;
    private UserDTO mockUser;
    @BeforeEach
    public void init() {
        mockGroup = RandomUtils.randomObject(GroupDTO.class);
        mockUser = RandomUtils.randomObject(UserDTO.class);

        Mockito.when(userApi.getUserById(mockUser.getId())).thenReturn(mockUser);
        Mockito.when(groupApi.getGroup(mockGroup.getId())).thenReturn(mockGroup);


    }

    @Test
    void createPost() {

        PostCreateReqVO post = RandomUtils.randomObject(PostCreateReqVO.class, (p) -> {
            p.setUserId(mockUser.getId());
            p.setGroupId(mockGroup.getId());
        });
        Post actualPost = BeanUtil.copy(post, Post.class).setId(44l);
        Mockito.when(postService.createPost(post)).thenReturn(actualPost);


        CommonResult<PostRespVO> resp = postController.createPost(post);
        Assertions.assertEquals(resp.getData().getId(), actualPost.getId());
        Assertions.assertEquals(mockUser.getFirstName(), resp.getData().getUser().getFirstName());
        Assertions.assertEquals(mockGroup.getName(), resp.getData().getGroup().getName());

    }

}