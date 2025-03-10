package viosmash.dal.repository.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.profile.AddressEnum;
import viosmash.dal.dataobject.profile.UserAddress;
import viosmash.pojo.KeyValue;

import java.util.List;
import java.util.Optional;

public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {
    Optional<UserAddress> findByUserIdAndAddressEnum(Long userId, AddressEnum addressEnum);

    List<UserAddress> findAllByUserId(Long userId);
}
