package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.PostTag;

public interface PostTagRepository extends JpaRepository<PostTag, Long> {
    int countByTagName(String tagName);
}
