package viosmash.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.controller.share.vo.ShareRespVO;
import viosmash.dal.repo.ShareRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShareServiceImpl implements ShareService{
    private final ShareRepository shareRepository;
    @Override
    public void sharePost(Long postId) {

    }

    @Override
    public List<ShareRespVO> getListShare(Long postId) {
        return List.of();
    }
}
