package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.Share;

public interface ShareRepository extends JpaRepository<Share, Long> {
    int countByPostId(Long postId);

}
