package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Accessors(chain = true)
@Table(name = "tblConversation")
@ToString
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Conversation {
    @Id
    @GeneratedValue(strategy =   GenerationType.IDENTITY)
    private Long id;
    private String nickname;
    private String thumbnail;
    private LocalDateTime createdAt;

}
