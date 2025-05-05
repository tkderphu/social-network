package viosmash.convert;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import viosmash.profile.api.UserDTO;
import viosmash.controller.post.vo.UserMakeFriendRequestRespVO;
import viosmash.controller.post.vo.UserRespVO;
import viosmash.nodes.UserMakesFriendRequest;
import viosmash.collection.CollUtils;
import viosmash.object.BeanUtil;

import java.util.Collection;
import java.util.List;

@Mapper
public interface UserConvert {
    UserConvert INSTANCE = Mappers.getMapper(UserConvert.class);

    UserRespVO convert(UserDTO userDTO);
    default UserRespVO convert(UserDTO userDTO, List<UserDTO> mutualFriends) {
        UserRespVO userRespVO = convert(userDTO);
        userRespVO.setMutualFriends(convert(mutualFriends));
        return userRespVO;
    }
    default UserMakeFriendRequestRespVO convert0(UserMakesFriendRequest userMakeRequest,
                                                 UserDTO userDTO,
                                                 List<UserDTO> mutualFriends) {
        UserMakeFriendRequestRespVO resp = BeanUtil.copy(userDTO, UserMakeFriendRequestRespVO.class);
        assert resp != null;
        resp.setMutualFriends(convert(mutualFriends));
        resp.setSince(userMakeRequest.getSince());
        return resp;
    }
    default List<UserRespVO> convert(Collection<UserDTO> collection) {
        return CollUtils.convertList(collection, this::convert);
    }
}
