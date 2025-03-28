package viosmash.service;

import viosmash.controller.vo.GroupReactionTypeResp;
import viosmash.controller.vo.ReactionCreateReq;
import viosmash.controller.vo.ReactionUpdateReq;
import viosmash.dal.dataobject.Reaction;
import viosmash.enums.EntityType;
import viosmash.enums.ReactionType;

import java.util.List;

public interface ReactionService {

    Reaction createReaction(ReactionCreateReq req);
    Reaction updateReaction(ReactionUpdateReq req);
    void deleteReaction(String reactionId);

    List<Reaction> getTop3Reaction(EntityType entityType, Long entityId);
    int countReaction(EntityType entityType, Long entityId);

    List<GroupReactionTypeResp> countReactionAndGroupByReactionType(EntityType entityType, Long entityId);

    List<Reaction> getListReaction(EntityType entityType,
                                   Long entityId,
                                   ReactionType reactionType);
}
