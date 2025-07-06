package viosmash.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import viosmash.BaseTest;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.dal.dataobject.Post;
import viosmash.dal.repo.PostRepository;
import viosmash.dal.repo.PostTagRepository;
import viosmash.dal.repo.TagRepository;
import viosmash.friendship.api.FriendshipApi;
import viosmash.group.api.GroupApi;
import viosmash.random.RandomUtils;

import java.time.LocalDateTime;
import java.util.List;

class PostServiceTest extends BaseTest {

    @Autowired
    private  PostRepository postRepository;
    @MockitoBean
    private  GroupApi groupApi;
    @Autowired
    private  PostTagRepository postTagRepository;
    @Autowired
    private  TagRepository tagRepository;
    @MockitoBean
    private  FriendshipApi friendshipApi;
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

//        PageResult<PostRespVO> listPostByUserId = postService.getListPostByUserId(1l, 1, 20);

//        Assertions.assertEquals(listPostByUserId.getData().size(), 4);

    }

    @Test
    void getNewFeeds() {
        Long currentUserId = 5l;
        Post post1 = new Post().setUserId(1l).setVotes(500).setGroupId(1l).setCreatedDate(LocalDateTime.now().minusDays(8));
        Post post2 = new Post().setUserId(2l).setVotes(34).setGroupId(1l).setCreatedDate(LocalDateTime.now().minusDays(2));
        Post post3 = new Post().setUserId(3l).setVotes(55).setGroupId(3l).setCreatedDate(LocalDateTime.now().minusWeeks(5));
        Post post4 = new Post().setUserId(3l).setVotes(23).setCreatedDate(LocalDateTime.now().minusHours(5));
        Post post5 = new Post().setUserId(5l).setVotes(0).setCreatedDate(LocalDateTime.now());
        Post post6 = new Post().setUserId(6l).setVotes(5).setCreatedDate(LocalDateTime.now().minusMinutes(5));

        post1.calculateHotScore();
        post2.calculateHotScore();
        post3.calculateHotScore();
        post4.calculateHotScore();
        post5.calculateHotScore();
        post6.calculateHotScore();

        //@currentUserId joined groups = [1, 2]
        //@currentUserId are friends of users = [3, 6]
        //when call getNewfeed then will be received posts = [post1, post2, post4, post6]
        Mockito.when(friendshipApi.getListRecommendUser(Mockito.anyLong()))
                .thenAnswer((invocationOnMock -> {
                    return List.of(3l, 6l);
                }));

        Mockito.when(groupApi.getListGroup(Mockito.anyLong()))
                .thenAnswer(invocationOnMock -> {
                    return List.of(1l, 2l);
                });


        this.postRepository.save(post1);
        this.postRepository.save(post2);
        this.postRepository.save(post3);
        this.postRepository.save(post4);
        this.postRepository.save(post5);
        this.postRepository.save(post6);

        List<PostRespVO> newFeeds = this.postService.getNewFeeds(currentUserId, , 1, 20);

        Assertions.assertEquals(newFeeds.size(), 4);

    }
}