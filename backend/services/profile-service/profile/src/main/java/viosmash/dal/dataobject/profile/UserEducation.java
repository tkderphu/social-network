package viosmash.dal.dataobject.profile;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "profile_education")
public class UserEducation {
    private Long id;

    @Enumerated(EnumType.STRING)
    private EducationEnum educationEnum;
    private Long userId;

    private Long pageId;
    private String pageName;
}
