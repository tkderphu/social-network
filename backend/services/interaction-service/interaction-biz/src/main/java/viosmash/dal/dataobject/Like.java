package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@Table(name = "tblLike")
@Entity
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private ObjectType objectType;
    @Column(nullable = false)
    private Long objectId;
    @Column(nullable = false)
    private LocalDateTime createdAt;

    public static enum ObjectType {
        POST, COMMENT, CHAT_MESSAGE
    }
}
