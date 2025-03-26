package viosmash.dal.dataobject.profile;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Table(name = "profile_personal_image")
@Data
@Accessors(chain = true)
public class UserPersonalImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String url;
    @Enumerated(EnumType.STRING)
    private PersonalImageEnum personalImageEnum;

    private Long postId;
}
