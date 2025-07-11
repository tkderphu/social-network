package viosmash.dal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.BlockedUser;

import java.util.List;

public interface BlockedUserRepository extends JpaRepository<BlockedUser, Long> {
    BlockedUser findByFromUserIdAndToUserId(Long fromUserId, Long toUserId);

    List<BlockedUser> findAllByFromUserId(Long fromUserId);
}
