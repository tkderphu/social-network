package viosmash.dal.dataobject;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Table(name = "tblPublicConversation")
@DiscriminatorColumn(name = "PUBLIC")
@Data
@Accessors(chain = true)
public class PublicConversation extends Conversation{
    private Boolean onlyAdminChat;
    private Boolean onlyAdminInvite;
    private Boolean onlyAdminUpdateNickname;
    private Boolean onlyAdminUpdateThumbnail;
}
