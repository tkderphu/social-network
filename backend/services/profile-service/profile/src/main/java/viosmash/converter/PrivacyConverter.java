package viosmash.converter;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import viosmash.controller.privacy.vo.PrivacyRespVO;
import viosmash.dal.dataobject.privacy.UserMessage;
import viosmash.dal.dataobject.privacy.UserNotification;
import viosmash.dal.dataobject.privacy.UserPost;
import viosmash.object.BeanUtil;

@Mapper
public interface PrivacyConverter {
    PrivacyConverter INSTANCE = Mappers.getMapper(PrivacyConverter.class);

    default PrivacyRespVO convert(UserPost userPost, UserMessage userMessage, UserNotification userNotification) {
        return new PrivacyRespVO()
                .setPost(BeanUtil.copy(userPost, PrivacyRespVO.Post.class).setValueEnum(userPost.getPostEnum().name()))
                .setMessage(BeanUtil.copy(userMessage, PrivacyRespVO.Message.class).setValueEnum(userMessage.getMessageEnum().name()))
                .setNotification(BeanUtil.copy(userNotification, PrivacyRespVO.Notification.class).setValueEnum(userNotification.getNotificationEnum().name()));

    }
}
