package viosmash.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import viosmash.controller.message.vo.MessageCreateReqVO;
import viosmash.controller.message.vo.MessageRespVO;

import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{


    @Override
    public void createMessage(MessageCreateReqVO req) {

    }

    @Override
    public List<MessageRespVO> getListMessage(Long conversationId, Long beforeMessageId, int limit) {
        return List.of();
    }
}
