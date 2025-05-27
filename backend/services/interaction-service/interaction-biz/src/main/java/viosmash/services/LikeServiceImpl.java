package viosmash.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.controller.like.vo.LikeUpdateReqVO;
import viosmash.dal.dataobject.Like;
import viosmash.dal.repo.LikeRepository;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class LikeServiceImpl implements LikeService{
    private final LikeRepository likeRepository;
    @Override
    public void updateLike(Long userId, LikeUpdateReqVO req) {
        Like like = likeRepository
                .findByUserIdAndObjectIdAndObjectType(userId, req.getObjectId(), req.getObjectType())
                .orElse(null);
        if(like != null) {
            likeRepository.delete(like);
        } else {
            likeRepository.save(new Like().setCreatedAt(LocalDateTime.now())
                    .setObjectId(req.getObjectId()).setObjectType(req.getObjectType())
                    .setUserId(userId));
        }
    }

    @Override
    public boolean checkLike(Long userId, Long objectId, Like.ObjectType objectType) {
        return likeRepository
                .findByUserIdAndObjectIdAndObjectType(userId, objectId, objectType)
                .isPresent();
    }

    @Override
    public int countLike(Long objectId, Like.ObjectType objectType) {
        return this.likeRepository.countByObjectIdAndObjectType(objectId, objectType);
    }

    @Override
    public void deleteAllLike(Long objectId, Like.ObjectType objectType) {
        this.likeRepository.deleteAllByObjectIdAndObjectType(objectId, objectType);
    }
}
