package viosmash.services;

import org.springframework.scheduling.annotation.Async;
import viosmash.dal.dataobject.Interaction;
import viosmash.interaction.enums.InteractionType;

import java.util.List;

public interface InteractionService {
    @Async
    void addNewInteraction(Long fromUserId, Long toUserId, InteractionType type);
    List<Interaction> getListInteraction(Long fromUserId);
}
