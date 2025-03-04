package viosmash.dal.repository.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.profile.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
}
