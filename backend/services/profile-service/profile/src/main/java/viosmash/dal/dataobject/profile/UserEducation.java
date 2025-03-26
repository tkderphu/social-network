package viosmash.dal.dataobject.profile;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Table(name = "profile_education")
@Data
@Accessors(chain = true)
public class UserEducation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private EducationEnum educationEnum;
    private Long userId;

    private Long pageId;
    private String pageName;
}
