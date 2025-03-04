package viosmash.dal.repository.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.profile.UserPersonalImage;

public interface UserPersonalImageRepository extends JpaRepository<UserPersonalImage, Long> {
}
