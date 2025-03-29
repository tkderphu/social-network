package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import viosmash.controller.vo.ConversationCreateReq;
import viosmash.controller.vo.MessageReqVO;
import viosmash.dal.dataobject.Conversation;
import viosmash.dal.dataobject.Message;
import viosmash.dal.repo.MessageRepository;
import viosmash.dal.repo.UserConversationRepository;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;

import java.util.List;

import static viosmash.dal.dataobject.Conversation.ConversationType.ONE_ONE;
import static viosmash.exception.utils.ServiceUtils.exception;


@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{

    private final MessageRepository messageRepository;
    private final ConversationService conversationService;

    @Override
    public Message createMessage(MessageReqVO req) {
        Message message = BeanUtil.copy(req, Message.class);
        if(req.getConversationId() != null) {
            this.messageRepository.save(message);
            return message;
        } else if(req.getToUserId() != null) {
            Conversation conversation = conversationService.createConversation(new ConversationCreateReq(
                    null, ONE_ONE, List.of(req.getSenderId(), req.getToUserId())
            ));
            message.setConversationId(conversation.getId());
            this.messageRepository.save(message);
            return message;
        }
        throw exception(HttpStatus.BAD_REQUEST.value(), "Destination(conversationId or toUserId) can't null");
    }

    @Override
    public PageResult<Message> getPageMessage(int page, int limit, Long conversationId) {
        PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        Page<Message> pageResp = this.messageRepository.findAll(pageRequest);
        return new PageResult<>(pageResp.getNumber() + 1, limit, pageResp.getContent());
    }
}
