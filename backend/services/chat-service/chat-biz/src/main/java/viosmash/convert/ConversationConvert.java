package viosmash.convert;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import viosmash.api.UserDTO;
import viosmash.controller.vo.ConversationRespVO;
import viosmash.controller.vo.MessageRespVO;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.Message;

@Mapper
public interface ConversationConvert {
    ConversationConvert INSTANCE = Mappers.getMapper(ConversationConvert.class);

    ConversationRespVO convert(Conversation conversation);

    default ConversationRespVO convert(Conversation conversation, Message latestMessage, UserDTO user) {
        MessageRespVO mesResp = MessageConvert.INSTANCE.convert(latestMessage, user);
        ConversationRespVO c = convert(conversation)
                .setLatestMessage(mesResp);
        return c;
    }

}
