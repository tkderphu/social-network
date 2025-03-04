package viosmash.dal.repository.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.profile.UserAddress;

public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {
}
