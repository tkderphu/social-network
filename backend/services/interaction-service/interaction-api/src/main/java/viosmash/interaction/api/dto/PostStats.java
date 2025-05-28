package viosmash.interaction.api.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class PostStats {
    private int numberComment;
    private int numberShare;
    private int numberLike;
}
