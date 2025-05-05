package viosmash.controller.group.vo;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import viosmash.group.enums.GroupType;

@Data
public class GroupUpdateReqVO {
    @NotNull(message = "id can't null")
    private Long id;
    private String name;
    private String description;
    private GroupType groupType;
}
