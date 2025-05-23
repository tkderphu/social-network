package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.controller.report.vo.ReportCreateReqVO;
import viosmash.pojo.PageResult;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{
    @Override
    public void createReport(ReportCreateReqVO req) {

    }

    @Override
    public PageResult<PostRespVO> getPageReport() {
        return null;
    }
}
