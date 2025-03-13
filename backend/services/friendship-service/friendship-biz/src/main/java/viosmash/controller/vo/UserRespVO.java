package viosmash.controller.vo;

import lombok.Getter;
import lombok.Setter;
import viosmash.api.UserDTO;

import java.util.List;


@Getter
@Setter
public class UserRespVO extends UserDTO {

    private List<UserRespVO> mutualFriends;

}
