package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Table(name = "tblMemberWaitingReview")
@Entity
@Accessors(chain = true)
public class MemberWaitingReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long groupId;

    private LocalDateTime requestedDate;
}
