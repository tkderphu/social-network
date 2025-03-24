package viosmash.dal.dataobject;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "post_waiting_review")
public class PostWaitingReview {
    @Id
    private Long postId;
    private Long groupId;
}
