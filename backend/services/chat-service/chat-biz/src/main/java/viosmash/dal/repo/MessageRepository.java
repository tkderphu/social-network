package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
