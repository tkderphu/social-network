package viosmash.dal.repo.v1;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.v1.VoteNotification;

public interface VoteNotificationRepository extends JpaRepository<VoteNotification, Long> {
}
