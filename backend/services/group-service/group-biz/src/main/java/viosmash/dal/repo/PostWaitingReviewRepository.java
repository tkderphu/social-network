package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.PostWaitingReview;

public interface PostWaitingReviewRepository extends JpaRepository<PostWaitingReview, Long> {
}
