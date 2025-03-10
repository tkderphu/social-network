package viosmash.dal.repository.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.profile.EducationEnum;
import viosmash.dal.dataobject.profile.UserEducation;
import viosmash.pojo.KeyValue;

import java.util.List;
import java.util.Optional;

public interface UserEducationRepository extends JpaRepository<UserEducation, Long> {
    Optional<UserEducation> findByUserIdAndEducationEnum(Long userId, EducationEnum educationEnum);

    List<UserEducation> findAllByUserId(Long userId);
}
