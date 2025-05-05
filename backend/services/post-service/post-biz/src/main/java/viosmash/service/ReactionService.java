package viosmash.service;

import viosmash.controller.reaction.vo.ReactionRespVO;
import viosmash.controller.reaction.vo.ReactionUpdateReqVO;
import viosmash.post.enums.ReactionType;

import java.util.List;

public interface ReactionService {
    void updateReaction(Long userId, ReactionUpdateReqVO req);
    List<ReactionRespVO> getListReaction(Long reactionType, ReactionType type);
}
