package viosmash.nodes;

import lombok.*;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.time.LocalDateTime;
import java.util.Objects;

@RelationshipProperties
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Friend {

    private LocalDateTime since;
    @TargetNode
    private User user;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Friend that = (Friend) o;
        return Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(user);
    }
}
