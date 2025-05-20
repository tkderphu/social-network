package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
