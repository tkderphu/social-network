package viosmash.dal.dataobject;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tblPrivateConversation")
@DiscriminatorColumn(name = "PRIVATE")
@Data
public class PrivateConversation extends Conversation{
    private Long userOne;
    private Long userTwo;
}
