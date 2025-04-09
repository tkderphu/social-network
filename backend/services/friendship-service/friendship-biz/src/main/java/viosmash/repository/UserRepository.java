package viosmash.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import viosmash.nodes.User;
import viosmash.nodes.UserMakesFriendRequest;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends Neo4jRepository<User, Long> {


    @Query("match (user:USERS {id: $userOneId})-[:FRIEND]->(person:USERS)-[:FRIEND]->(userTwo:USERS {id: $userTwoId}) return person")
    List<User> findAllMutualFriendsByTwoUser(Long userOneId, Long userTwoId);


    @Query(value = "match (user:USERS {id: $userOne})-[b:FRIEND]->(user1:USERS {id: $userTwo})\n" +
            "match (user1)-[c:FRIEND]->(user)\n" +
            "delete b, c", delete = true)
    void removeFriendship(Long userOne, Long userTwo);

    @Query("match (receiver:USERS)<-[m:MAKE_FRIEND_REQUEST]-(sender:USERS) \n" +
            "where receiver.id = $receiverId\n" +
            "return m")
    List<UserMakesFriendRequest> findAllReceivedFriendRequests(Long receiverId);

    @Query("match (uOne:USERS {id: $userOne})-[:FRIEND]->(friend:USERS {id: $userTwo}) return uOne")
    Optional<User> checkFriendStatus(Long userOne, Long userTwo);

    @Query("match (uOne: USERS {id: $fromUser})-[:MAKE_FRIEND_REQUEST]->(uTwo:USERS {id: $toUser}) return uOne")
    Optional<User> checkMakeFriendRequest(Long fromUser, Long toUser);


    @Query("match (user:USERS {id: $userId})-[:FRIEND]->(friend:USERS)-[:FRIEND]->(mutual:USERS),\n" +
            "(friend)<-[:MAKE_FRIEND_REQUEST]-(userMake:USERS)\n" +
            "where mutual.id <> $userId \n" +
            "return mutual.id as id\n" +
            "union\n" +
            "match (user:USERS {id: $userId})-[:FRIEND]->(friend:USERS)-[:FRIEND]->(mutual:USERS),\n" +
            "(friend)<-[:MAKE_FRIEND_REQUEST]-(userMake:USERS)\n" +
            "where not (user)<-[:MAKE_FRIEND_REQUEST]-(userMake)\n" +
            "return userMake.id as id")
    List<Long> suggestionFriendsToUser(Long userId);
}
