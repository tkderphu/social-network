package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

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
    private ConversationType conversationType = ConversationType.PRIVATE;

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
