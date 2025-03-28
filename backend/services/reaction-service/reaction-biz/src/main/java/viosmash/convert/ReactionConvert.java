package viosmash.convert;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import viosmash.api.Top3ReactionDTO;
import viosmash.api.UserDTO;
import viosmash.collection.CollUtils;
import viosmash.enums.Emoji;
import viosmash.controller.vo.ReactionResp;
import viosmash.dal.dataobject.Reaction;

import java.util.List;

@Mapper
public interface ReactionConvert {
    ReactionConvert INSTANCE = Mappers.getMapper(ReactionConvert.class);

    default ReactionResp convert(Reaction reaction, UserDTO userDTO) {
        ReactionResp reactionResp = new ReactionResp()
                .setId(reaction.getId())
                .setUser(userDTO)
                .setEmoji(Emoji.of(reaction.getReactionType()));
        return reactionResp;
    }
}
