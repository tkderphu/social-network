package viosmash.dal.repository.privacy;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.privacy.UserPost;

public interface UserPostRepository extends JpaRepository<UserPost, Long> {
}
