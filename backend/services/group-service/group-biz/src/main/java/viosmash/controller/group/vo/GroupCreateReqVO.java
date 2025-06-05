package viosmash.controller.group.vo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import viosmash.group.enums.GroupType;

import java.util.Set;

@Data
public class GroupCreateReqVO {
    @NotEmpty(message = "Name of group can't empty")
    private String name;
    @NotNull(message = "group type can't null")
    private GroupType groupType;


    private Set<Long> userIds;
}
