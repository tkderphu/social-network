package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Accessors(chain = true)
@ToString
@Table(name = "tblConversation")
public  class Conversation {
    @Id
    private String id;
    protected String nickname;
    protected String thumbnail;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private ConversationType conversationType;

    @OneToMany(mappedBy = "conversation")
    private List<MemberConversation> memberConversations;

    /**
     * group chat
     */
    private boolean onlyAdminChat;
    private boolean onlyAdminInvite;
    private boolean onlyAdminUpdateNickname;
    private boolean onlyAdminUpdateThumbnail;




    public void addMember(MemberConversation memberConversation) {
        if(memberConversations == null) {
            memberConversations = new ArrayList<>();
        }
        memberConversations.add(memberConversation);
    }

}
