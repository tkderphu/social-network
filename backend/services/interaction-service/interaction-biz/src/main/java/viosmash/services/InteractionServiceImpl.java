package viosmash.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.dal.dataobject.Interaction;
import viosmash.dal.repo.InteractionRepository;
import viosmash.interaction.enums.InteractionType;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InteractionServiceImpl implements InteractionService {
    private final InteractionRepository interactionRepository;
    @Override
    public void addNewInteraction(Long fromUserId, Long toUserId, InteractionType type) {
        if(fromUserId.equals(toUserId)) return;
        Interaction interaction = this.interactionRepository.findByFromUserAndToUser(fromUserId, toUserId)
                .orElse(null);
        float rate = 0.01f;
        if(interaction == null) {
            interaction = new Interaction()
                    .setFromUser(fromUserId)
                    .setToUser(toUserId);
            rate = 1f;
        }
        interaction.plusScore(type, rate);
        this.interactionRepository.save(interaction);
    }

    @Override
    public List<Interaction> getListInteraction(Long fromUserId) {
        return this.interactionRepository.findAllByFromUser(fromUserId);
    }
}
