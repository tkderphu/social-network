package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Accessors(chain = true)
@Table(name = "tblConversation")
public class Conversation {
    @Id
    @GeneratedValue(strategy =   GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String imageUrl;
    @Enumerated(EnumType.STRING)
    private ConversationType type;

    private LocalDateTime createdAt;

    public static enum ConversationType {
        MANY_MANY,
        ONE_ONE
    }
}
