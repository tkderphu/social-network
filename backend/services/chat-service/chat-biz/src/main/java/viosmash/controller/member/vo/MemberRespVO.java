package viosmash.controller.member.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.chat.enums.Role;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@Schema(description = "info member")
public class MemberRespVO {
    private Long id;
    private String firstName;
    private String lastName;
    private String avatar;
    private Boolean isOnline;



    @Schema(description = "what role member in conversation")
    private Role role;
    @Schema(description = "which date was invited")
    private LocalDateTime invitedAt;
    @Schema(description = "who invited")
    private MemberRespVO invitedBy;
}
