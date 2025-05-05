package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.post.enums.ReactionType;

@Data
@Accessors(chain = true)
@Entity
@Table(name = "tblActivity")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long reactionTypeId;
    @Enumerated
    private ReactionType reactionType;
    private int countVal;

    public void increment() {
        this.countVal ++;
    }
    public void decrement() {
        this.countVal --;
    }
}
