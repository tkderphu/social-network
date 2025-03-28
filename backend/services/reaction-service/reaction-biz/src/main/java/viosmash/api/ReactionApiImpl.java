package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.collection.CollUtils;
import viosmash.enums.Emoji;
import viosmash.enums.EntityType;
import viosmash.service.ReactionService;

@RestController
@RequiredArgsConstructor
@RequestMapping(ReactionApi.PREFIX)
public class ReactionApiImpl implements ReactionApi{

    private final ReactionService reactionService;

    @Override
    @GetMapping("/count/{entityType}/{entityId}")
    public int countReaction(@PathVariable("entityType")EntityType entityType,
                             @PathVariable("entityId") Long entityId) {
        return reactionService.countReaction(entityType, entityId);
    }

    @Override
    @GetMapping("/top3/{entityType}/{entityId}")
    public Top3ReactionDTO getTop3Reaction(@PathVariable("entityType")EntityType entityType,
                                                 @PathVariable("entityId") Long entityId) {
        Top3ReactionDTO top3ReactionDTO = new Top3ReactionDTO();
        top3ReactionDTO.setNumber(reactionService.countReaction(entityType, entityId));
        top3ReactionDTO.setEmojis(CollUtils.convertList(
                reactionService.getTop3Reaction(entityType, entityId),
                reaction -> Emoji.of(reaction.getReactionType())
        ));

        return top3ReactionDTO;
    }
}
