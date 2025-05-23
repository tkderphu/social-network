package viosmash.convert;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import viosmash.controller.vo.message.NotifyMessageRespVO;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.object.BeanUtil;

@Mapper
public interface NotificationConvert {
    NotificationConvert INSTANCE = Mappers.getMapper(NotificationConvert.class);

    default NotifyMessageRespVO convert(NotifyMessage message) {
        return null;
    }
}
