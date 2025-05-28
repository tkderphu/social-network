package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.Interaction;

import java.util.List;
import java.util.Optional;

public interface InteractionRepository extends JpaRepository<Interaction, Long> {
    List<Interaction> findAllByFromUser(Long userId);

    Optional<Interaction> findByFromUserAndToUser(Long fromUserId, Long toUserId);
}
