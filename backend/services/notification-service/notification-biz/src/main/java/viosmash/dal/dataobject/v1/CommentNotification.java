package viosmash.dal.dataobject.v1;

import jakarta.persistence.Convert;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import viosmash.converter.JsonObjectConverter;
import viosmash.converter.JsonSetConverter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tblCommentNotification")
@Data
@DiscriminatorValue("COMMENT")
public class CommentNotification extends Notification{
    private Long postId;
    private Long commentId;


    @Convert(converter = JsonSetConverter.class)
    private Set<Object> historyUsers;

    public void addHistory(Long userId) {
        if(historyUsers == null) {
            historyUsers = new HashSet<>();
        }
        historyUsers.add(userId);
    }
}
