package viosmash.controller.vote.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import viosmash.dal.dataobject.Vote;
import viosmash.interaction.enums.ObjectType;
import viosmash.interaction.enums.VoteType;

@Data
@Schema(name = "VoteUpdateReqVO - Thông tin đối tượng được cập nhật like")
public class VoteUpdateReqVO {

    @NotNull
    @Schema(description = "Mã id", defaultValue = "1")
    private Long objectId;

    @NotNull
    @Schema(description = "Kiểu", defaultValue = "POST")
    private ObjectType objectType;

    @NotNull
    @Schema(description = "Loai vote", defaultValue ="UP")
    private VoteType voteType;

}
