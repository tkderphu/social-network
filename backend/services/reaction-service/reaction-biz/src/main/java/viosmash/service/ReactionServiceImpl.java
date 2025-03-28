package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.controller.vo.GroupReactionTypeResp;
import viosmash.controller.vo.ReactionCreateReq;
import viosmash.controller.vo.ReactionUpdateReq;
import viosmash.dal.dataobject.Reaction;
import viosmash.dal.repo.ReactionRepository;
import viosmash.enums.EntityType;
import viosmash.enums.ReactionType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReactionServiceImpl implements ReactionService{
    private final ReactionRepository reactionRepository;
    @Override
    public Reaction createReaction(ReactionCreateReq req) {
        Reaction reaction = new Reaction()
                .setReactionType(req.getReactionType())
                .setCreatedAt(LocalDateTime.now())
                .setId(UUID.randomUUID().toString())
                .setUserId(req.getUserId())
                .setEntityId(req.getEntityId())
                .setEntityType(req.getEntityType());

        reactionRepository.save(reaction);

        return reaction;
    }

    @Override
    public Reaction updateReaction(ReactionUpdateReq req) {
        Reaction reaction = this.reactionRepository.findById(req.getId())
                .get().setReactionType(req.getReactionType());
        reactionRepository.save(reaction);
        return reaction;
    }

    @Override
    public void deleteReaction(String reactionId) {
        this.reactionRepository.deleteById(reactionId);
    }

    @Override
    public List<Reaction> getTop3Reaction(EntityType entityType, Long entityId) {
        return List.of();
    }

    @Override
    public int countReaction(EntityType entityType, Long entityId) {
        return this.reactionRepository.countAllByEntityTypeAndEntityId(
                entityType,
                entityId
        );
    }

    @Override
    public List<GroupReactionTypeResp> countReactionAndGroupByReactionType(EntityType entityType, Long entityId) {
        return null;
    }

    @Override
    public List<Reaction> getListReaction(EntityType entityType,
                                          Long entityId,
                                          ReactionType reactionType) {
        return this.reactionRepository.findAllByEntityTypeAndEntityTypeAndReactionType(
                entityType,
                entityId,
                reactionType
        );
    }
}
