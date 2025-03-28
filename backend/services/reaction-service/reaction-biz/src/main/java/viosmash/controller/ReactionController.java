package viosmash.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.api.ProfileApi;
import viosmash.api.UserDTO;
import viosmash.controller.vo.GroupReactionTypeResp;
import viosmash.enums.Emoji;
import viosmash.controller.vo.ReactionCreateReq;
import viosmash.controller.vo.ReactionResp;
import viosmash.dal.dataobject.Reaction;
import viosmash.enums.EntityType;
import viosmash.enums.ReactionType;
import viosmash.pojo.CommonResult;
import viosmash.pojo.KeyValue;
import viosmash.service.ReactionService;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static viosmash.collection.CollUtils.*;
import static viosmash.collection.MapUtils.convert;
import static viosmash.convert.ReactionConvert.INSTANCE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reactions")
public class ReactionController {

    private final ReactionService reactionService;
    private final ProfileApi profileApi;

    @GetMapping("/emojis")
    public List<Emoji> getListEmojis() {
        return convertList(Arrays.stream(ReactionType.values()).toList(), reactionType -> {
            return Emoji.of(reactionType);
        });
    }

    @PostMapping
    public CommonResult<ReactionResp> createReaction(@Valid @RequestBody ReactionCreateReq req) {
        Reaction reaction = reactionService.createReaction(req);
        UserDTO userDTO = profileApi.getUserById(reaction.getUserId());
        return CommonResult.success(INSTANCE.convert(reaction, userDTO));
    }


    @GetMapping("/group/{entityType}/{entityId}")
    public CommonResult<List<GroupReactionTypeResp>> getGroupReaction(
            @PathVariable("entityType") EntityType entityType,
            @PathVariable("entityId") Long entityId
    ) {
        return CommonResult.success(reactionService.countReactionAndGroupByReactionType(
                entityType,
                entityId
        ));
    }



    @GetMapping("/{reactionType}/{entityType}/{entityId}")
    public CommonResult<List<ReactionResp>> getListReaction(
            @PathVariable("entityId") Long entityId,
            @PathVariable("entityId")EntityType entityType,
            @PathVariable("reactionType") ReactionType reactionType
            ) {
        List<Reaction> reactions = reactionService.getListReaction(entityType, entityId, reactionType);

        Map<Long, Reaction> mapUserIdWithReaction = convert(convertList(reactions, react -> {
            return new KeyValue<>(react.getUserId(), react);
        }));
        List<UserDTO> users = profileApi.getAllUsers(convertList(reactions, Reaction::getUserId));

        return CommonResult.success(convertList(users, user -> {
            return INSTANCE.convert(mapUserIdWithReaction.get(user.getId()), user);
        }));
    }

}
