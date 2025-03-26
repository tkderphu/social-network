package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import viosmash.dal.dataobject.GroupSetting;

public interface GroupSettingRepository extends JpaRepository<GroupSetting, Long> {



    GroupSetting findByGroupId(Long groupId);

    @Modifying
    @Query("UPDATE GroupSetting g\n" +
            "SET g.enableAutoAcceptMember = :enableAutoAcceptMember, " +
            "g.enableAutoReviewPost = :enableAutoReviewPost \n" +
            "WHERE g.groupId = :groupId")
    int updateSetting(@Param("groupId") Long groupId,
                       @Param("enableAutoAcceptMember") Boolean enableAutoAcceptMember,
                       @Param("enableAutoReviewPost") Boolean enableAutoReviewPost);
}
