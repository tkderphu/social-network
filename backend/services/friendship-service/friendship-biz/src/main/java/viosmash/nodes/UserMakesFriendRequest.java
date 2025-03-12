package viosmash.nodes;


import lombok.*;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.time.LocalDateTime;
import java.util.Objects;

@RelationshipProperties
@Data
@NoArgsConstructor
public class UserMakesFriendRequest {
    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime since;
    @TargetNode
    private User user;

    public UserMakesFriendRequest(LocalDateTime since, User user) {
        this.since = since;
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserMakesFriendRequest that = (UserMakesFriendRequest) o;
        return Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(user);
    }
}
