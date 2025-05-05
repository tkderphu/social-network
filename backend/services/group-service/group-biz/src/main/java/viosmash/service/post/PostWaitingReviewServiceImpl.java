package viosmash.service.post;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.aop.GroupPermission;
import viosmash.dal.repo.PostWaitingReviewRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostWaitingReviewServiceImpl implements PostWaitingReviewService{
    private final PostWaitingReviewRepository postWaitingReviewRepository;
    @Override
    public Boolean pushPostToWaitingBucket(Long groupId, Long postId) {
        return null;
    }

    @Override
    public List<Long> getListPostByUser(Long userId) {
        return List.of();
    }

    @Override
    @GroupPermission
    public List<Long> getListPostByGroup(Long groupId) {
        return List.of();
    }

    @Override
    @GroupPermission
    public Boolean acceptPost(Long groupId, Long postId) {
        return null;
    }


    @Override
    @GroupPermission
    public Boolean deletePost(Long postId) {
        return null;
    }
}
