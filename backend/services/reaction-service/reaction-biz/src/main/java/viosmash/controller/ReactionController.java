package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.Emoji;
import viosmash.enums.ReactionType;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reactions")
public class ReactionController {

    @GetMapping("/emojis")
    public List<Emoji> getListEmojis() {
        return CollUtils.convertList(Arrays.stream(ReactionType.values()).toList(), reactionType -> {
            return Emoji.of(reactionType);
        });
    }

}
