package viosmash.controller.like.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import viosmash.dal.dataobject.Like;

@Data
@Schema(name = "LikeUpdateReqVO - Thông tin đối tượng được cập nhật like")
public class LikeUpdateReqVO {

    @NotNull
    @Schema(description = "Mã id", defaultValue = "1")
    private Long objectId;

    @NotNull
    @Schema(description = "Kiểu", defaultValue = "POST")
    private Like.ObjectType objectType;

    private Long authorId;
}
