package viosmash.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import viosmash.nodes.User;
import viosmash.nodes.UserMakesFriendRequest;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends Neo4jRepository<User, Long> {


    @Query("match (user:USERS {id: $userOneId})-[:FRIEND]->(person:USERS)-[:FRIEND]->(userTwo:USERS {id: $userTwoId}) return person.id")
    Set<Long> findAllMutualFriendsByTwoUser(Long userOneId, Long userTwoId);


    @Query(value = "match (user:USERS {id: $userOne})-[b:FRIEND]->(user1:USERS {id: $userTwo})\n" +
            "match (user1)-[c:FRIEND]->(user)\n" +
            "delete b, c", delete = true)
    void removeFriendship(Long userOne, Long userTwo);

    @Query("""
        MATCH (sender:USERS)-[m:MAKE_FRIEND_REQUEST]->(receiver:USERS {id: $receiverId})
        RETURN m, m.since as since, sender as user
    """)
    Set<UserMakesFriendRequest> findAllReceivedFriendRequests(Long receiverId);

    @Query("match (uOne:USERS {id: $userOne})-[:FRIEND]->(friend:USERS {id: $userTwo}) return uOne")
    Optional<User> checkFriendStatus(Long userOne, Long userTwo);

    @Query("match (uOne: USERS {id: $fromUser})-[:MAKE_FRIEND_REQUEST]->(uTwo:USERS {id: $toUser}) return uOne")
    Optional<User> checkMakeFriendRequest(Long fromUser, Long toUser);


    @Query("MATCH (user:USERS {id: $userId})-[:FRIEND]->(:USERS)-[:FRIEND]->(mutual:USERS)\n" +
            "WHERE NOT (user)-[:FRIEND]-(mutual)\n" +
            "  AND NOT (user)-[:MAKE_FRIEND_REQUEST]->(mutual)\n" +
            "  AND NOT (mutual)-[:MAKE_FRIEND_REQUEST]->(user)\n" +
            "  AND mutual.id <> $userId\n" +
            "RETURN \n" +
            "  mutual.id AS id\n" +
            "UNION\n" +
            "MATCH (us2:USERS {id: $userId})-[:MAKE_FRIEND_REQUEST]->(:USERS)-[:FRIEND]->(mutual2:USERS)\n" +
            "WHERE NOT (us2)-[:FRIEND]-(mutual2)\n" +
            "  AND NOT (us2)-[:MAKE_FRIEND_REQUEST]->(mutual2)\n" +
            "  AND NOT (mutual2)-[:MAKE_FRIEND_REQUEST]->(us2)\n" +
            "  AND mutual2.id <> $userId\n"+
            "RETURN \n" +
            "  mutual2.id AS id\n")
    Set<Long> suggestionFriendsToUser(Long userId);

    @Query(value = "match (fromUser:USERS {id: $fromUserId})-[request:MAKE_FRIEND_REQUEST]->(userMake:USERS {id: $toUserId}) \n" +
            "delete request", delete = true)
    void removeMakeFriendRequest(Long fromUserId, Long toUserId);




    @Query("MATCH (user:USERS {id: $userId})-[:FRIEND]->(:USERS)-[:FRIEND]->(mutual:USERS)\n" +
            "WHERE NOT (user)-[:FRIEND]-(mutual)\n" +
            "  AND NOT (user)-[:MAKE_FRIEND_REQUEST]->(mutual)\n" +
            "  AND NOT (mutual)-[:MAKE_FRIEND_REQUEST]->(user)\n" +
            "  AND mutual.id <> $userId\n" +
            "RETURN \n" +
            "  mutual.id AS id\n" +
            """
            UNION
            MATCH (us1:USERS {id: $userId})-[:FRIEND]->(user_friend:USERS)
            RETURN 
                user_friend.id as id    
            UNION
            MATCH (us3:USERS {id: $userId})-[:MAKE_FRIEND_REQUEST]->(user:USERS)
            RETURN 
                user.id as id    
            """ +
            "UNION\n" +
            "MATCH (us2:USERS {id: $userId})-[:MAKE_FRIEND_REQUEST]->(:USERS)-[:FRIEND]->(mutual2:USERS)\n" +
            "WHERE NOT (us2)-[:FRIEND]-(mutual2)\n" +
            "  AND NOT (us2)-[:MAKE_FRIEND_REQUEST]->(mutual2)\n" +
            "  AND NOT (mutual2)-[:MAKE_FRIEND_REQUEST]->(us2)\n" +
            "  AND mutual2.id <> $userId\n"+
            "RETURN \n" +
            "  mutual2.id AS id\n")
    Set<Long> findAllUserCanInteract(Long userId);
}
