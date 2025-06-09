package viosmash.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import viosmash.BaseTest;
import viosmash.controller.vote.vo.VoteUpdateReqVO;
import viosmash.dal.repo.VoteRepository;
import viosmash.random.RandomUtils;

class VoteServiceImplTest extends BaseTest {

    @Autowired
    private VoteRepository voteRepository;
    @Autowired
    private VoteService voteService;
    @Test
    void updateLike() {
        VoteUpdateReqVO req = RandomUtils.randomObject(VoteUpdateReqVO.class);
        this.voteService.updateLike(1l, req);

        boolean b = voteService.checkVote(1l, req.getObjectId(), req.getObjectType());
        Assertions.assertEquals(b, true);
    }

    @Test
    void updateLike2() {
        VoteUpdateReqVO req = RandomUtils.randomObject(VoteUpdateReqVO.class);
        this.voteService.updateLike(1l, req);

        RandomUtils.randomObject(VoteUpdateReqVO.class);
        this.voteService.updateLike(1l, req);

        boolean b = voteService.checkVote(1l, req.getObjectId(), req.getObjectType());
        Assertions.assertEquals(b, false);
    }




    @Test
    void countLike() {
        VoteUpdateReqVO req = RandomUtils.randomObject(VoteUpdateReqVO.class);
        for(long i = 0; i < 5; i++) {
            this.voteService.updateLike(i, req);
        }
        int i = voteService.countLike(req.getObjectId(), req.getObjectType());
        Assertions.assertEquals(i, 5);
    }
}