package viosmash.dal.repository.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.profile.UserEducation;

public interface UserEducationRepository extends JpaRepository<UserEducation, Long> {
}
