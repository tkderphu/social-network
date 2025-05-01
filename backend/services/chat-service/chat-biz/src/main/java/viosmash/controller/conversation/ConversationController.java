package viosmash.controller.conversation;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.enums.ApiConstant;
import viosmash.service.ConversationService;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstant.APP_PREFIX + "/conversations")
public class ConversationController {

    private final ConversationService conversationService;

}
