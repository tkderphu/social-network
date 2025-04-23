package viosmash.convert;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import viosmash.api.UserDTO;
import viosmash.controller.vo.MessageRespVO;
import viosmash.dal.dataobject.Message;

@Mapper
public interface MessageConvert {
    MessageConvert INSTANCE = Mappers.getMapper(MessageConvert.class);
    MessageRespVO convert(Message message);
    default MessageRespVO convert(Message message, UserDTO user) {
        MessageRespVO resp = convert(message)
                .setSender(user);
        return resp;
    }
}
