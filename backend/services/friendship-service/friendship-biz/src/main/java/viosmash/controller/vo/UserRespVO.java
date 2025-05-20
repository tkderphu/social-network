package viosmash.controller.vo;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;



@Data
@Accessors(chain = true)
public class UserRespVO  {
    private Long id;
    private String firstName;
    private String lastName;
    private String avatar;
    private Boolean isOnline;
    private List<UserRespVO> mutualFriends;

}
