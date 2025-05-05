package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.controller.reaction.vo.ReactionRespVO;
import viosmash.controller.reaction.vo.ReactionUpdateReqVO;
import viosmash.dal.dataobject.Activity;
import viosmash.dal.dataobject.Reaction;
import viosmash.dal.repo.ActivityRepository;
import viosmash.dal.repo.ReactionRepository;
import viosmash.date.DateUtils;
import viosmash.post.enums.ReactionType;
import viosmash.object.BeanUtil;
import viosmash.profile.api.UserApi;

import java.time.LocalDateTime;
import java.util.List;

import static viosmash.collection.CollUtils.convertList;

@Service
@RequiredArgsConstructor
public class ReactionServiceImpl implements ReactionService{
    private final ReactionRepository reactionRepository;
    private final ActivityRepository activityRepository;
    private final UserApi userApi;
    @Override
    @Transactional
    public void updateReaction(Long userId, ReactionUpdateReqVO req) {
        Activity activity = activityRepository.findByReactionTypeIdAndReactionType(req.getReactionTypeId(), req.getReactionType());
        Reaction reaction = reactionRepository.findByUserIdAndActivityId(userId, activity.getId()).orElse(null);
        if(reaction == null) {
            reaction = new Reaction().setActivity(activity).setUserId(userId).setCreatedDate(LocalDateTime.now());
            activity.increment();
            this.reactionRepository.save(reaction);
            this.activityRepository.save(activity);
        } else {
            activity.decrement();
            this.reactionRepository.deleteById(reaction.getId());
            this.activityRepository.save(activity);
        }
    }

    @Override
    public List<ReactionRespVO> getListReaction(Long reactionType, ReactionType type) {
       return convertList(reactionRepository.findAllByReactionType(reactionType, type), reaction -> {
           return BeanUtil.copy(reaction, ReactionRespVO.class)
                   .setUser(userApi.getUserById(reaction.getUserId()))
                   .setTimeAgo(DateUtils.timeAgo(reaction.getCreatedDate()));
       });
    }
}
