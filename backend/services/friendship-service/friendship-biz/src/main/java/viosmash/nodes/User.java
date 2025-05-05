package viosmash.nodes;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static viosmash.nodes.RelationshipConstant.*;

@Node("USERS")
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class User {
    @Id
    private Long id;
    private String firstName;
    private String lastName;
    private String avatar;

    @Relationship(value = FRIEND, direction = Relationship.Direction.OUTGOING)
    private Set<Friend> friends = new HashSet<>();

    @Relationship(value = MAKE_FRIEND_REQUEST, direction = Relationship.Direction.OUTGOING)
    private Set<UserMakesFriendRequest> userMakesFriendRequests = new HashSet<>();

    public User(Long id) {
        this.id = id;
    }


    public boolean makesNewFriendRequest(User user) {
        boolean isOk = this.userMakesFriendRequests.add(new UserMakesFriendRequest(LocalDateTime.now(), user));
        return isOk;
    }

    public boolean acceptFriendRequest(User user) {
        boolean isOk = this.friends.add(new Friend(LocalDateTime.now(), user));
        isOk = isOk && user.friends.add(new Friend(LocalDateTime.now(), this));
        return isOk;
    }


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }


}
