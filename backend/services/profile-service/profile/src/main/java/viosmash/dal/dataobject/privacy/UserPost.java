package viosmash.dal.dataobject.privacy;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Table(name = "profile_privacy_post")
@Entity
@Data
@Accessors(chain = true)
public class UserPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private PostEnum postEnum;

    @Column(unique = true)
    private Long userId;
}
