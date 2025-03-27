package viosmash.dal.dataobject;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import viosmash.enums.EntityType;
import viosmash.enums.ReactionType;

import java.time.LocalDateTime;

@Document(collection = "Reaction")
@Accessors(chain = true)
@Data
public class Reaction {
    @Id
    private String id;
    private ReactionType reactionType;
    private EntityType entityType;
    private Long entityId;

    private Long userId;

    private LocalDateTime createdAt;
}
