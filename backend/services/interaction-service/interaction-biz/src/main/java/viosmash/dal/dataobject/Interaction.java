package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.interaction.enums.InteractionType;

/**
 * Store interaction of this user to another user
 * for recommendation
 */
@Data
@Accessors(chain = true)
@Entity
@Table(name = "tblInteraction")
public class Interaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long fromUser;
    @Column(nullable = false)
    private Long toUser;
    @Column(nullable = false)
    private int score;

    public void plusScore(InteractionType interactionType) {
        score += interactionType.getScore();
    }
}
