package viosmash.dal.dataobject;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

@Entity
@Data
@Accessors(chain = true)
@Table(name = "tblNewfeedItem")
public class NewfeedItem {
    @Id
    private Long id;
    private Long userId;
    private Long postId;
    private Date timeline;
    private int isAdvertised;
    private Boolean isRead;

    @Override
    public boolean equals(Object object) {
        if (object == null || getClass() != object.getClass()) return false;
        NewfeedItem that = (NewfeedItem) object;
        return Objects.equals(userId, that.userId) && Objects.equals(postId, that.postId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, postId);
    }
}
