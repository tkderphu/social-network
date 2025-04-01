package viosmash.event.friend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import viosmash.UserDTO;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendEvent {
    private UserDTO fromUser;
    private UserDTO toUser;
    private LocalDateTime date;
}
