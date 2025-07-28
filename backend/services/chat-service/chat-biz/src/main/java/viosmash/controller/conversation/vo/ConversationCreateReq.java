package viosmash.controller.conversation.vo;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConversationCreateReq {

    private String nickname;
    @NotNull
    private Collection<Long> userIds;
    private String thumbnail;
}
