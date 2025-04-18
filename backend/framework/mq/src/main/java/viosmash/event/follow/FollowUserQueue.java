package viosmash.event.follow;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static viosmash.EventConstant.*;

@Configuration
public class FollowUserQueue {
    public Queue followUserQueue() {
        return new Queue(
                FOLLOW_USER + QUEUE_SUFFIX
        );
    }

    @Bean
    public DirectExchange followUserQueueDE() {
        return new DirectExchange(FOLLOW_USER + DIRECT_SUFFIX);
    }
    @Bean
    public Binding bindingFollowUserQueue(Queue followUserQueue, DirectExchange followUserQueueDE) {
        return BindingBuilder
                .bind(followUserQueue)
                .to(followUserQueueDE)
                .with(FOLLOW_USER + ROU_SUFFIX);
    }

}
