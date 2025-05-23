package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.Tag;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, String> {
    Tag findByName(String name);
    List<Tag> findByNameContaining(String name);
}
