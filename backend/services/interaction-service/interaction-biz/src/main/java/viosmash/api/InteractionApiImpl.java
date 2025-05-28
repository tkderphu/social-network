package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import viosmash.collection.CollUtils;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Interaction;
import viosmash.dal.dataobject.Like;
import viosmash.dal.dataobject.Share;
import viosmash.dal.repo.CommentRepository;
import viosmash.dal.repo.InteractionRepository;
import viosmash.dal.repo.LikeRepository;
import viosmash.dal.repo.ShareRepository;
import viosmash.exception.ServiceException;
import viosmash.interaction.api.InteractionApi;
import viosmash.interaction.api.dto.HistoryInteraction;
import viosmash.interaction.api.dto.PostStats;
import viosmash.interaction.api.dto.ShareInteractionDto;
import viosmash.interaction.enums.InteractionType;
import viosmash.object.BeanUtil;
import viosmash.services.InteractionService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(InteractionApi.PREFIX)
public class InteractionApiImpl implements InteractionApi {

    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final ShareRepository shareRepository;
    private final InteractionService interactionService;

    @Override
    @GetMapping("/stats/post/{postId}")
    public PostStats countInteraction(@PathVariable("postId") Long postId) {
        PostStats postStats = new PostStats()
                .setNumberComment(commentRepository.countByPostId(postId))
                .setNumberLike(likeRepository.countByObjectIdAndObjectType(postId, Like.ObjectType.POST))
                .setNumberShare(shareRepository.countByPostId(postId));
        return postStats;
    }

    @Override
    @PutMapping("/share/post")
    @Transactional(rollbackFor = ServiceException.class)
    public void updateSharePost(@RequestBody ShareInteractionDto dto) {
        Share share = new Share().setPostId(dto.getPostId()).setUserId(SecurityUtils.getLoginUserMemberId());
        this.shareRepository.save(share);
        interactionService.addNewInteraction(
                SecurityUtils.getLoginUserMemberId(),
                dto.getAuthorId(),
                InteractionType.SHARE_POST
        );
    }

    @Override
    @GetMapping("/{userId}")
    public List<HistoryInteraction> getListHistoryInteraction(@PathVariable("userId") Long userId) {
        List<Interaction> interactions = this.interactionService.getListInteraction(userId);
        return CollUtils.convertList(interactions, interaction -> {
            HistoryInteraction historyInteraction = BeanUtil.copy(interaction, HistoryInteraction.class);
            historyInteraction.setUserId(interaction.getToUser());
            return historyInteraction;
        });
    }


}
