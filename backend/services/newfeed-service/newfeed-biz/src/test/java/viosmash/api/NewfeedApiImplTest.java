package viosmash.api;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import viosmash.BaseTest;
import viosmash.collection.CollUtils;
import viosmash.friendship.api.FriendshipApi;
import viosmash.friendship.api.UserDTO;
import viosmash.group.api.GroupApi;
import viosmash.pojo.api.group.GroupDTO;
import viosmash.object.BeanUtil;
import viosmash.post.api.PostApi;
import viosmash.pojo.api.post.PostDTO;
import viosmash.random.RandomUtils;

import java.util.ArrayList;
import java.util.List;

class NewfeedApiImplTest extends BaseTest {

    @MockitoBean
    private PostApi postApi;
    @MockitoBean
    private GroupApi groupApi;
    @MockitoBean
    private FriendshipApi friendshipApi;

    @BeforeEach
    void init() {
        List<PostDTO> posts = new ArrayList<>();
        List<GroupDTO> groups = new ArrayList<>();
        List<UserDTO> users = new ArrayList<>();
        for(int i = 0;  i < 100; i++) {
            GroupDTO groupDTO = RandomUtils.randomObject(GroupDTO.class);
            UserDTO userDTO = RandomUtils.randomObject(UserDTO.class);
            if(userDTO.getId() % 2 == 0) {
                posts.add(new PostDTO().setUser(BeanUtil.copy(userDTO, viosmash.pojo.api.profile.UserDTO.class)));
            } else if(userDTO.getId() % 3 == 0) {
                posts.add(new PostDTO().setUser(BeanUtil.copy(userDTO, viosmash.pojo.api.profile.UserDTO.class))
                        .setGroup(groupDTO));
            } 
        }
        Mockito.when(groupApi.getGroup(Mockito.anyLong())).thenAnswer(invocationOnMock -> {
            Long groupId = invocationOnMock.getArgument(0, Long.class);
            invocationOnMock.callRealMethod();
            return groups.stream().filter(r -> r.getId().equals(groupId)).findFirst().get();
        });
        Mockito.when(postApi.getListPostByAuthors(Mockito.anyCollection())).thenAnswer(invocationOnMock -> {
            List<Long> userIds = invocationOnMock.getArgument(0, List.class);
            if(true) {
                List<PostDTO> post = new ArrayList<>();
                CollUtils.convertList(userIds, userId -> {
                    post.addAll(CollUtils.convertList(posts, q -> {
                        return q;
                    }, object -> {
                        return object.getUser().getId().equals(userId);
                    }));
                    return null;
                });
                return post;
            }
            return invocationOnMock.callRealMethod();
        });
    }

    @org.junit.jupiter.api.Test
    void updateNewFeed() {
    }
}