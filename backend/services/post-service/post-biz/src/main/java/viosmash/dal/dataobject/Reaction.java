package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Table(name = "tblReaction")
@Data
@Entity
@Accessors(chain = true)
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private LocalDateTime createdDate;
    @ManyToOne
    @JoinColumn(name = "activityId")
    private Activity activity;
}
