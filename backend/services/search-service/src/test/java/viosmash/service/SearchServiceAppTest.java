package viosmash.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import viosmash.BaseTest;
import viosmash.collection.CollUtils;
import viosmash.core.utils.SecurityUtils;
import viosmash.friendship.api.FriendshipApi;
import viosmash.object.BeanUtil;
import viosmash.post.api.PostApi;
import viosmash.profile.api.UserApi;
import viosmash.profile.api.UserDTO;
import viosmash.random.RandomUtils;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
class SearchServiceAppTest extends BaseTest {

    @MockitoBean
    private PostApi postApi;
    @MockitoBean
    private FriendshipApi friendshipApi;
    @MockitoBean
    private UserApi userApi;
    
    @Autowired
    private  SearchService service;

    private final List<UserDTO> USERS = new ArrayList<>();

    @BeforeEach
    void init() {
        for(int i = 0; i < 50; i++) {
            var user = new UserDTO();
            user.setId(Long.valueOf(i));
            user.setFirstName("phu ");
            user.setLastName("quang " + i);
            USERS.add(user);
        }

    }

    @org.junit.jupiter.api.Test
    void searchUser() {
        //search keyword: phu quang => [0, 49]
        //friends of user(0): 1, 2, 5, 7
        //each user: [[0, 0], [1, 10], [2, 10], [3, 5], [4, 0], [5, 10], [6, 0], [7, 10]]
        // => return [1, 2, 5, 7, 3] limit 5 skip 0
        List<Long> friends = List.of(1l, 2l, 5l, 7l); //friends of user: 0;
        Map<Long, Set<Long>> mutualFriends = new HashMap<>(); //mutual friends with user: 0
        mutualFriends.put(3l, Set.of(13l, 15l, 18l, 19l));
        Mockito.when(friendshipApi.getListCommonFriends(Mockito.anyLong(), Mockito.anyLong()))
                .thenAnswer(invocationOnMock -> {
                    Long userId = invocationOnMock.getArgument(0, Long.class);
                    if(mutualFriends.containsKey(userId)) {
                        return mutualFriends.get(userId);
                    }
                    return new HashSet<>();
                });

        Mockito.when(friendshipApi.getListFriends(Mockito.anyLong()))
                .thenReturn(friends);

        Mockito.when(userApi.searchByFullName(Mockito.anyString()))
                .thenReturn(USERS);

        Mockito.mockStatic(SecurityUtils.class)
                .when(() -> SecurityUtils.getLoginUserMemberId())
                .thenReturn(0l);

        //res: [1,2,5, 7, 3]
        List<UserDTO> userDTOList = service.searchUser("", 0, 5);

        Assertions.assertEquals(CollUtils.convertList(userDTOList, UserDTO::getId), List.of(1l, 2l, 5l, 7l, 3l));

    }

    @org.junit.jupiter.api.Test
    void searchPost() {
    }

    @org.junit.jupiter.api.Test
    void testSearchPost() {
    }
}