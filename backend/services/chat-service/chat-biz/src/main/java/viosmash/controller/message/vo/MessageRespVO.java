package viosmash.controller.message.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.controller.member.vo.MemberRespVO;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Accessors(chain = true)
public class MessageRespVO {
    private Long id;

    private MemberRespVO sender;
    private Long conversationId;
    private String message;

    private List<String> images;

    private List<String> files;

    private LocalDateTime createdAt;
}
