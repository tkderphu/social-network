package viosmash.dal.dataobject.profile;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Table(name = "profile_education")
@Data
@Accessors(chain = true)
public class UserEducation {
    private Long id;

    @Enumerated(EnumType.STRING)
    private EducationEnum educationEnum;
    private Long userId;

    private Long pageId;
    private String pageName;
}
