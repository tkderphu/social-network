package viosmash.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import viosmash.collection.StreamUtils;
import viosmash.controller.vote.vo.VoteUpdateReqVO;
import viosmash.dal.dataobject.Vote;
import viosmash.dal.repo.VoteRepository;
import viosmash.interaction.enums.ObjectType;
import viosmash.interaction.enums.VoteType;
import viosmash.object.BeanUtil;
import viosmash.post.api.PostApi;
import viosmash.profile.api.UserApi;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RequiredArgsConstructor
@Service
public class VoteServiceImpl implements VoteService {
    private final VoteRepository voteRepository;
    private final PostApi postApi;
    @Override
    public void updateVote(Long userId, VoteUpdateReqVO req) {


        var isExists = this.voteRepository.findByUserIdAndObjectIdAndObjectType(
                userId,
                req.getObjectId(),
                req.getObjectType()
        ).orElse(null);

        if(isExists != null) {
            if(isExists.getVoteType() == req.getVoteType()) {
                this.voteRepository.delete(isExists);
            } else {
                isExists.setVoteType(req.getVoteType());
                this.voteRepository.save(isExists);
            }
        } else {
            isExists = BeanUtil.copy(req, Vote.class)
                    .setUserId(userId).setCreatedAt(LocalDateTime.now());
            this.voteRepository.save(isExists);
        }

        if(req.getObjectType() == ObjectType.POST) {
            postApi.updateVote(req.getObjectId(), count(req.getObjectId(), req.getObjectType()));
        }

    }

    @Override
    public int checkVote(Long userId, Long objectId, ObjectType objectType) {
        var isExists = this.voteRepository.findByUserIdAndObjectIdAndObjectType(
                userId,
                objectId,
                objectType
        ).get();
        if(isExists == null) return 0;
        if(isExists.getVoteType() == VoteType.UP) return 1;
        return -1;
    }


    @Override
    public int count(Long objId, ObjectType objType) {
        List<Vote> votes = this.voteRepository.findAllByObjectIdAndObjectType(objId, objType);
        int score = StreamUtils.mapToInt(votes,v -> v.getVoteType() == VoteType.UP ? 1 : -1).sum();
        return score;
    }
}
