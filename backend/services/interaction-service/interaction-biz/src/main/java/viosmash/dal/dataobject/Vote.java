package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.LastModifiedDate;
import viosmash.interaction.enums.ObjectType;
import viosmash.interaction.enums.VoteType;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@Table(name = "tblVote")
@Entity
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ObjectType objectType;
    @Column(nullable = false)
    private Long objectId;
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private VoteType voteType;

}
