package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import viosmash.api.UserApi;
import viosmash.collection.CollUtils;
import viosmash.controller.conversation.vo.*;
import viosmash.convert.ConversationConvert;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.Member;
import viosmash.dal.dataobject.Message;
import viosmash.dal.dataobject.PublicConversation;
import viosmash.dal.repo.ConversationRepository;
import viosmash.dal.repo.MessageRepository;
import viosmash.dal.repo.UserConversationRepository;
import viosmash.object.BeanUtil;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static viosmash.convert.MessageConvert.INSTANCE;
import static viosmash.exception.utils.ServiceUtils.exception;

@Slf4j
@RequiredArgsConstructor
@Service
public class ConversationServiceImpl implements ConversationService{


    @Override
    public Long createConversation(ConversationCreateReq req) {
        return 0L;
    }

    @Override
    public void updateNickname(ConversationUpdateNicknameReq req) {

    }

    @Override
    public void updateThumbnail(ConversationUpdateThumbnailReq req) {

    }

    @Override
    public void updatePolicy(ConversationUpdatePolicyReq req) {

    }

    @Override
    public List<ConversationRespVO> getListConversation(Long userId) {
        return List.of();
    }
}
