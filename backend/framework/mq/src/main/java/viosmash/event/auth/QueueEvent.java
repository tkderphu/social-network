package viosmash.event.auth;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import viosmash.EventConstant;

@Configuration
public class QueueEvent {

    @Bean
    public Queue userCreatedQueue() {
        return new Queue(String.format(EventConstant.USER_CREATED, "que"));
    }
    
    @Bean
    public DirectExchange userCreatedQueueDE() {
        return new DirectExchange(String.format(EventConstant.USER_CREATED, "dir"));
    }
    @Bean
    public Binding bindingUserCreatedQueue(Queue userCreatedQueue, DirectExchange userCreatedQueueDE) {
        return BindingBuilder
                .bind(userCreatedQueue)
                .to(userCreatedQueueDE)
                .with(String.format(EventConstant.USER_CREATED, "rou"));
    }

}
