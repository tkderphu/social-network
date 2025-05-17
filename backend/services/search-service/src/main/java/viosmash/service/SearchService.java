package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import viosmash.collection.CollUtils;
import viosmash.core.utils.SecurityUtils;
import viosmash.friendship.api.FriendshipApi;
import viosmash.post.api.PostDTO;
import viosmash.profile.api.UserApi;
import viosmash.profile.api.UserDTO;

import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class SearchService {
    private final UserApi userApi;
    private final FriendshipApi friendshipApi;


    public List<UserDTO> searchUser(String keyword, int skip, int limit) {
        Long currentId = SecurityUtils.getLoginUserMemberId();
        List<UserDTO> users = userApi.searchByFullName(keyword);
        List<Long> friends = friendshipApi.getListFriends(currentId);

        List<Object[]> objects = CollUtils.convertList(users, user -> {
            Set<Long> recommendations = friendshipApi.getListCommonFriends(user.getId(), currentId);
            Object[] objs = new Object[2];
            objs[0] = user;
            objs[1] = friends.contains(user.getId()) ? 10 : (CollectionUtils.isEmpty(recommendations) ? 0 : 5);
            return objs;
        }, (user1, user2) -> (int) user2[1] - (int) user1[1], skip, limit);

        return CollUtils.convertList(objects, obj -> (UserDTO) obj[0]);

    }

    public List<PostDTO> searchPost(String keyword, int skip, int limit) {
        return null;
    }

    public List<PostDTO> searchPost(String keyword, Long groupId, int skip, int limit) {
        return null;
    }


}
