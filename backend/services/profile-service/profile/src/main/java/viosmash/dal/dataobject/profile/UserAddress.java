package viosmash.dal.dataobject.profile;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Table(name = "profile_address")
@Accessors(chain = true)
@Data
public class UserAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    @Enumerated(EnumType.STRING)
    private AddressEnum addressEnum;

    private Long pageId;
    private String pageName;
}
