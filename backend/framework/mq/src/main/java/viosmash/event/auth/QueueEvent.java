package viosmash.event.auth;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import viosmash.EventConstant;

import static viosmash.EventConstant.*;
import static viosmash.EventConstant.QUEUE_SUFFIX;

@Configuration
public class QueueEvent {

    @Bean
    public Queue userCreatedQueue() {
        return new Queue(
                USER_CREATED + QUEUE_SUFFIX
        );
    }
    
    @Bean
    public DirectExchange userCreatedQueueDE() {
        return new DirectExchange(USER_CREATED + DIRECT_SUFFIX);
    }
    @Bean
    public Binding bindingUserCreatedQueue(Queue userCreatedQueue, DirectExchange userCreatedQueueDE) {
        return BindingBuilder
                .bind(userCreatedQueue)
                .to(userCreatedQueueDE)
                .with(USER_CREATED + ROU_SUFFIX);
    }

}
