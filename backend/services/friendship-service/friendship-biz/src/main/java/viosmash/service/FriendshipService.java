package viosmash.service;

import viosmash.nodes.Friend;
import viosmash.nodes.User;
import viosmash.nodes.UserMakesFriendRequest;

import java.util.List;
import java.util.Set;

public interface FriendshipService {
    /**
     * Lay danh sach ban be cua user
     * @param userId: id cua user
     * @return danh sach id cua user
     */
    Set<Friend> getListFriends(Long userId);

    /**
     * Lay danh sach ban be chung giua 2 nguoi dung
     * @param userOneId: id cua user
     * @param userTwoId: id cua id
     * @return danh sach id cua user chung
     */
    List<User> getListMutualFriends(Long userOneId, Long userTwoId);

    /**
     * Xoa ban be. User voi id = {userId} huy ket ban voi user co id = {targetUserId}
     * trong danh sach ban be
     * @param userId: id cua user
     * @param targetUserId: id cua user
     * @return true => thanh cong. else => that bai
     */
    boolean removeFriend(Long userId, Long targetUserId);

    /**
     * Gui yeu cau ket ban tu user co id = {userId}
     * den user co id = {targetUserId}
     * @param userId: id cua user
     * @param targetUserId: id cua user
     * @return true => thanh cong. else => that bai
     */
    boolean addNewUserMakeFriendRequest(Long userId, Long targetUserId);
//    boolean removeUserFriendRequest(Long userId, boolean isUserFriendRequest)

    boolean acceptUserFriendRequest(Long userId, Long targetUserId);

    /**
     * Lay danh sach gui yeu cau ket ban cua user co id = {userId}
     * @param userId: id cua user
     * @return danh sach id cua user, nguoi ma {userId} gui yeu cau ket ban
     */
    Set<UserMakesFriendRequest> getListUserFriendRequests(Long userId);

    /**
     * Lay danh sach yeu cau ket ban toi {userId}
     * @param userId: id cua user
     * @return danh sach id cua user, nguoi ma gui yeu cau ket ban toi {userId}
     */
    List<UserMakesFriendRequest> getListUserFriendRequestsByReceiver(Long userId);

    /**
     * Lay danh sach goi y cho {userId} dua tren
     * ban be chung, ye cau ket ban
     * @param userId: id cua user
     * @return danh sach id cua user, dua tren 2 tieu chi goi y tren
     */
    List<Long> getListSuggestionUser(Long userId);
}
