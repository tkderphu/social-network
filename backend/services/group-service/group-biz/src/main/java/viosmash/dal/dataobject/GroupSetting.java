package viosmash.dal.dataobject;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Table(name = "tbl_group_settings")
@Data
@Accessors(chain = true)
public class GroupSetting {
    @Id
    private Long groupId;
    private Boolean enableAutoAcceptMember;
    private Boolean enableAutoReviewPost;
}
