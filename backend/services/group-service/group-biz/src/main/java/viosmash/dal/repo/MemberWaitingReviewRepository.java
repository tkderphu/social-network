package viosmash.dal.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import viosmash.dal.dataobject.MemberWaitingReview;
import viosmash.dal.dataobject.UserMemberGroup;

import java.util.List;

public interface MemberWaitingReviewRepository extends JpaRepository<MemberWaitingReview, Long> {
    @Modifying
    void deleteAllByUserIdAndGroupId(Long userId, Long groupId);

    Page<MemberWaitingReview> findAllByGroupId(Long groupId, Pageable pageable);

    MemberWaitingReview findByUserIdAndGroupId(Long userId, Long groupId);
}
