package viosmash.service;

import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.cloud.client.discovery.simple.SimpleDiscoveryClientAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Import;
import viosmash.BaseTest;
import viosmash.config.EmbeddedNeo4jConfig;
import viosmash.constant.FriendshipStatus;
import viosmash.db.UserTable;
import viosmash.nodes.User;
import viosmash.nodes.UserMakesFriendRequest;
import viosmash.repository.UserRepository;

import java.util.List;
import java.util.Set;

import static viosmash.db.UserTable.*;

@Import(EmbeddedNeo4jConfig.class)
public class FriendshipServiceTest extends BaseTest{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FriendshipService friendshipService;
    @BeforeEach
    void init() {
        userRepository.saveAll(USER_TABLES);
    }

    @Test
    void getListFriends() {
        Long userId = USER_TABLES.get(0).getId();
        List<Long> friends = friendshipService.getListFriends(userId);
        Assertions.assertEquals(friends.size(), 0);
    }

    @Test
    void getListMutualFriends() {
    }

    @Test
    void removeFriend() {
        Long userOne = USER_TABLES.get(0).getId();
        Long userTwo = USER_TABLES.get(1).getId();
        friendshipService.addNewUserMakeFriendRequest(userOne, userTwo);

        boolean isSuccess = friendshipService.acceptUserFriendRequest(userTwo, userOne);
        FriendshipStatus status = friendshipService.getStatusFriendship(userOne, userTwo);


        Assertions.assertEquals(isSuccess, true);
        Assertions.assertEquals(status, FriendshipStatus.FRIEND);

        boolean isRemoveSuccess = friendshipService.removeFriend(userOne, userTwo);
        status = friendshipService.getStatusFriendship(userOne, userTwo);
        Assertions.assertEquals(isRemoveSuccess, true);
        Assertions.assertEquals(status, FriendshipStatus.NONE);

    }

    @Test
    void addNewUserMakeFriendRequest() {
        Long userOne = USER_TABLES.get(0).getId();
        Long userTwo = USER_TABLES.get(1).getId();

        boolean isSuccess = friendshipService.addNewUserMakeFriendRequest(userOne, userTwo);
        Set<UserMakesFriendRequest> userFriendRequests = friendshipService.getListUserFriendRequests(userOne);

        Assertions.assertEquals(isSuccess, true);
        Assertions.assertEquals(userFriendRequests.size(), 1);
    }

    @Test
    void acceptUserFriendRequest() {
        Long userOne = USER_TABLES.get(0).getId();
        Long userTwo = USER_TABLES.get(1).getId();
        friendshipService.addNewUserMakeFriendRequest(userOne, userTwo);

        boolean isSuccess = friendshipService.acceptUserFriendRequest(userTwo, userOne);
        FriendshipStatus status = friendshipService.getStatusFriendship(userOne, userTwo);


        Assertions.assertEquals(isSuccess, true);
        Assertions.assertEquals(status, FriendshipStatus.FRIEND);
    }

    @Test
    void getListUserFriendRequests() {
    }

    @Test
    void getListUserFriendRequestsByReceiver() {
    }

    @Test
    void getListSuggestionUser() {
    }

    @Test
    void getStatusFriendship() {
        Long userOne = USER_TABLES.get(0).getId();
        Long userTwo = USER_TABLES.get(1).getId();
        //test 1: two user hasn't any related -> ok
//        FriendshipStatus status = friendshipService.getStatusFriendship(userOne, userTwo);
//        Assertions.assertEquals(status, FriendshipStatus.NONE);

        //test2: userOne make friend to userTwo => userOne -> userTwo = MAKE_FRIEND; userTwo -> userOne = ACCEPT_FRIEND
//        friendshipService.addNewUserMakeFriendRequest(userOne, userTwo);
//        FriendshipStatus statusOne = friendshipService.getStatusFriendship(userOne, userTwo);
//        FriendshipStatus statusTwo = friendshipService.getStatusFriendship(userTwo, userOne);
//
//        Assertions.assertEquals(statusOne, FriendshipStatus.MAKE_FRIEND);
//        Assertions.assertEquals(statusTwo, FriendshipStatus.ACCEPT_FRIEND);

        //test3: when both are friend
//        friendshipService.addNewUserMakeFriendRequest(userOne, userTwo);
//
//        boolean isSuccess = friendshipService.acceptUserFriendRequest(userTwo, userOne);
//        FriendshipStatus status = friendshipService.getStatusFriendship(userOne, userTwo);
//
//        Assertions.assertEquals(isSuccess, true);
//        Assertions.assertEquals(status, FriendshipStatus.FRIEND);

    }
}