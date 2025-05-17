package viosmash.dal.dataobject;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
    private Long id;
    private Long fromUser;
    private Long toUser;
    private int score;

    public void plusScore(InteractionType interactionType) {
        score += interactionType.getScore();
    }
}
