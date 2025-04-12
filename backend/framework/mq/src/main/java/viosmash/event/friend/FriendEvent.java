package viosmash.event.friend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import viosmash.UserDTO;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FriendEvent {
    private UserDTO fromUser;
    private UserDTO toUser;
    private Date date;
}
