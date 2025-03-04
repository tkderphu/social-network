package viosmash.dal.dataobject.profile;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "profile_address")
public class UserAddress {
    private Long id;
    private Long userId;
    @Enumerated(EnumType.STRING)
    private AddressEnum addressEnum;

    private Long pageId;
    private String pageName;
}
