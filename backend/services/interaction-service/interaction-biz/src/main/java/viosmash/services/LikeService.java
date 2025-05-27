package viosmash.services;

import viosmash.controller.like.vo.LikeUpdateReqVO;
import viosmash.core.utils.LoginUser;
import viosmash.dal.dataobject.Like;

public interface LikeService {
    void updateLike(Long userId, LikeUpdateReqVO req);

    boolean checkLike(Long userId, Long objectId, Like.ObjectType objectType);
    int countLike(Long objectId, Like.ObjectType objectType);
    void deleteAllLike(Long objectId, Like.ObjectType objectType);
}
