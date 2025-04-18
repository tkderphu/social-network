package viosmash;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;

import java.lang.reflect.Type;

public class SendToUserRequestHandler extends StompSessionHandlerAdapter {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public Type getPayloadType(StompHeaders headers) {
        return String.class;
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        String request = (String) payload;
        logger.info("[handleFrame][headers({}) payload({})]", headers, request);
    }
}