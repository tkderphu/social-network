package viosmash.service;

import viosmash.controller.post.vo.PostRespVO;
import viosmash.controller.report.vo.ReportCreateReqVO;
import viosmash.pojo.PageResult;

public interface ReportService {
    void createReport(ReportCreateReqVO req);
    PageResult<PostRespVO> getPageReport();
}
