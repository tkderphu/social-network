package viosmash.controller.member.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.chat.enums.Role;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@Schema(description = "info member")
public class MemberConversationRespVO {
    private Long id;
    private UserDTO member;


    @Schema(description = "what role member in conversation")
    private Role role;
    @Schema(description = "which date was invited")
    private LocalDateTime invitedAt;
    @Schema(description = "who invited")
    private UserDTO invitedBy;

    private Boolean enableSoundNotification;
    private Boolean enablePushNotification;



}
