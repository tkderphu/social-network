package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import viosmash.dal.dataobject.MemberWaitingReview;

import java.util.List;

public interface MemberWaitingReviewRepository extends JpaRepository<MemberWaitingReview, Long> {
    @Modifying
    void deleteAllByUserIdAndGroupId(Long userId, Long groupId);

    List<MemberWaitingReview> findAllByGroupId(Long groupId);

}
