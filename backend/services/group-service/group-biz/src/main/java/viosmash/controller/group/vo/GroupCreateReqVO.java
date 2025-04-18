package viosmash.controller.group.vo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import viosmash.enums.GroupType;

import java.util.List;
import java.util.Set;

@Data
public class GroupCreateReqVO {
    @NotEmpty(message = "Name of group can't empty")
    private String name;
    @NotNull(message = "group type can't null")
    private GroupType groupType;
    @NotEmpty
    @Length(min = 20, message = "at least 20 character")
    private String description;
    @Size(min = 3, message = "number of users must greater equal than 3")
    private Set<Long> userIds;
}
