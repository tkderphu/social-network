package viosmash.services;

import viosmash.controller.vote.vo.VoteUpdateReqVO;
import viosmash.interaction.enums.ObjectType;

public interface VoteService {
    void updateVote(Long userId, VoteUpdateReqVO req);
    int checkVote(Long userId, Long objectId, ObjectType objectType);
    int count(Long objId, ObjectType objType);
}
