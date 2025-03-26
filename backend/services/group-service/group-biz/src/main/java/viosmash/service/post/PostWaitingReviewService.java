package viosmash.service.post;

import viosmash.dal.dataobject.PostWaitingReview;

import java.util.List;

public interface PostWaitingReviewService {
    Boolean pushPostToWaitingBucket(Long groupId, Long postId);
    List<Long> getListPostByUser(Long userId);
    List<Long> getListPostByGroup(Long groupId);

    Boolean acceptPost(Long groupId,
                       Long postId);

    List<PostWaitingReview> getListRequestPublishAtGroup(Long groupId);
    Boolean deletePost(Long postId);
}
