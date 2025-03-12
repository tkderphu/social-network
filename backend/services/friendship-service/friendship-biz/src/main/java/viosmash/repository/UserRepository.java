package viosmash.repository;

import org.neo4j.cypherdsl.core.Use;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import viosmash.nodes.User;
import viosmash.nodes.UserMakesFriendRequest;

import java.util.List;

public interface UserRepository extends Neo4jRepository<User, Long> {


    @Query("match (user:USERS {id: $userOneId})-[:FRIEND]->(person:USERS)-[:FRIEND]->(userTwo:USERS {id: $userTwoId}) return person")
    List<User> findAllMutualFriendsByTwoUser(Long userOneId, Long userTwoId);


    @Query(value = "match (user:USERS {id: 26})-[b:FRIEND]->(user1:USERS {id: $userId})\n" +
            "match (user1)-[c:FRIEND]->(user)\n" +
            "delete b, c", delete = true)
    void removeFriendship(Long userOne, Long userTwo);

    @Query("match (receiver:USERS)<-[m:MAKE_FRIEND_REQUEST]-(sender:USERS) \n" +
            "where receiver.id = $receiverId\n" +
            "return m")
    List<UserMakesFriendRequest> findAllReceivedFriendRequests(Long receiverId);

    
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
