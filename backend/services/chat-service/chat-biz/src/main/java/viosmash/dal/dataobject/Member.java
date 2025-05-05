package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Entity
@Data
@Accessors(chain = true)
@Table(name = "tblMember")
public class Member {

    @Id
    private Long id;
    private String firstName;
    private String lastName;
    private String avatar;
    private Boolean isOnline;


    @OneToMany(mappedBy = "member")
    private List<MemberConversation> memberConversations;
}
