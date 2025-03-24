package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viosmash.dal.dataobject.GroupSetting;

public interface GroupSettingRepository extends JpaRepository<GroupSetting, Long> {



    GroupSetting findByGroupId(Long groupId);

    @Query("UPDATE GroupSetting g\n" +
            "SET g.enableAutoAcceptMember = :enableAutoAcceptMember \n" +
            "AND g.enableAutoReviewPost = :enableAutoReviewPost \n" +
            "WHERE g.groupId = :groupId")
    void updateSetting(Long groupId,
                       Boolean enableAutoAcceptMember,
                       Boolean enableAutoReviewPost);
}
