package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.Group;

public interface GroupRepository extends JpaRepository<Group, Long> {
}
