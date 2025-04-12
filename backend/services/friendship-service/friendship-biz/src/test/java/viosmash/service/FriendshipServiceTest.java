package viosmash.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import viosmash.BaseTest;
import viosmash.config.EmbeddedNeo4jConfig;
import viosmash.constant.FriendshipStatus;
import viosmash.nodes.UserMakesFriendRequest;
import viosmash.repository.UserRepository;

import java.util.ArrayList;
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
        System.out.println("saved");
        userRepository.saveAll(USER_TABLES);
    }

    @AfterEach
    void destroy() {
        userRepository.deleteAll(USER_TABLES);
    }
    @Test
    void getListFriends() {
        Long userId = USER_TABLES.get(0).getId();
        List<Long> friends = friendshipService.getListFriends(userId);
        Assertions.assertEquals(friends.size(), 0);
    }

    @Test
    void getListMutualFriends() {
        createRelationFriendBetweenUser(USER_TABLES.get(0).getId(), USER_TABLES.get(1).getId());
        createRelationFriendBetweenUser(USER_TABLES.get(0).getId(), USER_TABLES.get(2).getId());
        createRelationFriendBetweenUser(USER_TABLES.get(0).getId(), USER_TABLES.get(3).getId());
        createRelationFriendBetweenUser(USER_TABLES.get(1).getId(), USER_TABLES.get(2).getId());
        createRelationFriendBetweenUser(USER_TABLES.get(1).getId(), USER_TABLES.get(3).getId());
        createRelationFriendBetweenUser(USER_TABLES.get(4).getId(), USER_TABLES.get(3).getId());


        //mutual friends between user (0, 1) = [2, 3]
        //                            (0, 4) = [3]

        Set<Long> mutual1 = friendshipService.getListMutualFriends(USER_TABLES.get(0).getId(), USER_TABLES.get(1).getId());
        Assertions.assertEquals(mutual1.size(), 2);
        Set<Long> mutual2 = friendshipService.getListMutualFriends(USER_TABLES.get(0).getId(), USER_TABLES.get(4).getId());
        Assertions.assertEquals(mutual2.size(), 1);
        Assertions.assertEquals(new ArrayList<>(mutual2).get(0), USER_TABLES.get(3).getId());

    }

    private void createRelationFriendBetweenUser(Long userOne, Long userTwo) {
        friendshipService.addNewUserMakeFriendRequest(userOne, userTwo);
        friendshipService.acceptUserMakeFriendRequest(userTwo, userOne);
    }

    @Test
    void removeFriend() {
        Long userOne = USER_TABLES.get(0).getId();
        Long userTwo = USER_TABLES.get(1).getId();
        friendshipService.addNewUserMakeFriendRequest(userOne, userTwo);

        boolean isSuccess = friendshipService.acceptUserMakeFriendRequest(userTwo, userOne);
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
    void acceptUserMakeFriendRequest() {
        Long userOne = USER_TABLES.get(0).getId();
        Long userTwo = USER_TABLES.get(1).getId();
        friendshipService.addNewUserMakeFriendRequest(userOne, userTwo);

        boolean isSuccess = friendshipService.acceptUserMakeFriendRequest(userTwo, userOne);
        FriendshipStatus status = friendshipService.getStatusFriendship(userOne, userTwo);


        Assertions.assertEquals(isSuccess, true);
        Assertions.assertEquals(status, FriendshipStatus.FRIEND);
    }

    @Test
    void getListUserFriendRequests() {
        friendshipService.addNewUserMakeFriendRequest(USER_TABLES.get(0).getId(), USER_TABLES.get(1).getId());
        friendshipService.addNewUserMakeFriendRequest(USER_TABLES.get(0).getId(), USER_TABLES.get(2).getId());
        friendshipService.addNewUserMakeFriendRequest(USER_TABLES.get(0).getId(), USER_TABLES.get(3).getId());

        Set<UserMakesFriendRequest> ll = friendshipService.getListUserFriendRequests(USER_TABLES.get(0).getId());

        Assertions.assertEquals(ll.size(), 3);
    }

    @Test
    void getListUserFriendRequestsByReceiver() {
        friendshipService.addNewUserMakeFriendRequest(USER_TABLES.get(0).getId(), USER_TABLES.get(3).getId());
        friendshipService.addNewUserMakeFriendRequest(USER_TABLES.get(1).getId(), USER_TABLES.get(3).getId());
        friendshipService.addNewUserMakeFriendRequest(USER_TABLES.get(2).getId(), USER_TABLES.get(3).getId());

        Set<UserMakesFriendRequest> ll = friendshipService.getListUserFriendRequestsByReceiver(USER_TABLES.get(3).getId());

        Assertions.assertEquals(3, ll.size());
    }

    @Test
    void getListSuggestionUser() {
        /// make suggestion
        friendshipService.addNewUserMakeFriendRequest(USER_TABLES.get(0).getId(), USER_TABLES.get(1).getId());
        createRelationFriendBetweenUser(USER_TABLES.get(1).getId(), USER_TABLES.get(2).getId());
        createRelationFriendBetweenUser(USER_TABLES.get(1).getId(), USER_TABLES.get(3).getId());
        createRelationFriendBetweenUser(USER_TABLES.get(0).getId(), USER_TABLES.get(4).getId());
        createRelationFriendBetweenUser(USER_TABLES.get(4).getId(), USER_TABLES.get(5).getId());
        friendshipService.addNewUserMakeFriendRequest(USER_TABLES.get(2).getId(), USER_TABLES.get(0).getId());

        /**
         * 0 make friend with 1
         * 1 is friends (2, 3) -> (2, 3)
         * 0 is friend (4)
         * 4 is friends (5) -> (5)
         */

        //suggestion of user(0) = [3, 5]
        Set<Long> users = friendshipService.getListSuggestionUser(USER_TABLES.get(0).getId());
        Assertions.assertEquals(users.size(), 2); //fail

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