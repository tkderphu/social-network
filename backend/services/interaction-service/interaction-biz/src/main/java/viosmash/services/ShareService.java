package viosmash.services;

import viosmash.controller.share.vo.ShareRespVO;

import java.util.List;

public interface ShareService {
    void sharePost(Long postId);
    List<ShareRespVO> getListShare(Long postId);
}
