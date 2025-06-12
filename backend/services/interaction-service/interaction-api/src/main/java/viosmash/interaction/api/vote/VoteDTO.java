package viosmash.interaction.api.vote;

import lombok.Data;
import viosmash.interaction.enums.ObjectType;
import viosmash.interaction.enums.VoteType;

@Data
public class VoteDTO {
    private Long id;
    private ObjectType objectType;
    private Object object;
    private VoteType voteType;
}
