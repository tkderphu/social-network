package viosmash.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import viosmash.BaseTest;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.ConversationType;
import viosmash.dal.dataobject.MemberConversation;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.MemberConversationRepository;

import static org.junit.jupiter.api.Assertions.*;

class ConversationServiceImplTest extends BaseTest {

    @Autowired
    private ConversationRepository conversationRepository;
    @Autowired
    private MemberConversationRepository memberConversationRepository;
    @Test
    void getPrivateConversation() {

        String conversationId = "235235324";

        Conversation conversation = new Conversation()
                .setId(conversationId);

        this.conversationRepository.save(conversation);

        MemberConversation memberConversation = new MemberConversation()
                .setConversation(new Conversation().setId(conversationId))
                .setMemberId(1l);

        MemberConversation memberConversation1 = new MemberConversation()
                .setConversation(new Conversation().setId(conversationId))
                .setMemberId(2l);

        memberConversationRepository.save(memberConversation1);
        memberConversationRepository.save(memberConversation);

        String privateConversation = conversationRepository.findPrivateConversation(1l, 2l);

        Assertions.assertEquals(privateConversation, conversationId);

    }
}