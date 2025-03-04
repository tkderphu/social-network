package viosmash.dal.dataobject.profile;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Table(name = "profile_personal_image")
@Data
@Accessors(chain = true)
public class UserPersonalImage {
    private Long id;
    private Long userId;
    private String url;
    @Enumerated(EnumType.STRING)
    private PersonalImageEnum personalImageEnum;

    private Long postId;
}
