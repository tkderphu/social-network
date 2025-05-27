package viosmash.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import viosmash.BaseTest;
import viosmash.controller.like.vo.LikeUpdateReqVO;
import viosmash.dal.repo.LikeRepository;
import viosmash.random.RandomUtils;

import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

class LikeServiceImplTest extends BaseTest {

    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private LikeService likeService;
    @Test
    void updateLike() {
        LikeUpdateReqVO req = RandomUtils.randomObject(LikeUpdateReqVO.class);
        this.likeService.updateLike(1l, req);

        boolean b = likeService.checkLike(1l, req.getObjectId(), req.getObjectType());
        Assertions.assertEquals(b, true);
    }

    @Test
    void updateLike2() {
        LikeUpdateReqVO req = RandomUtils.randomObject(LikeUpdateReqVO.class);
        this.likeService.updateLike(1l, req);

        RandomUtils.randomObject(LikeUpdateReqVO.class);
        this.likeService.updateLike(1l, req);

        boolean b = likeService.checkLike(1l, req.getObjectId(), req.getObjectType());
        Assertions.assertEquals(b, false);
    }




    @Test
    void countLike() {
        LikeUpdateReqVO req = RandomUtils.randomObject(LikeUpdateReqVO.class);
        for(long i = 0; i < 5; i++) {
            this.likeService.updateLike(i, req);
        }
        int i = likeService.countLike(req.getObjectId(), req.getObjectType());
        Assertions.assertEquals(i, 5);
    }
}