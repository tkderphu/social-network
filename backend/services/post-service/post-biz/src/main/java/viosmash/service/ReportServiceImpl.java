package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import viosmash.collection.CollUtils;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.controller.report.vo.ReportCreateReqVO;
import viosmash.dal.dataobject.Post;
import viosmash.dal.dataobject.Report;
import viosmash.dal.repo.PostRepository;
import viosmash.dal.repo.ReportRepository;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;
import viosmash.post.enums.ReportStatus;

import java.time.LocalDateTime;
import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{
    private final ReportRepository reportRepository;
    private final PostRepository postRepository;

    @Override
    public void createReport(ReportCreateReqVO req) {
        Report report = BeanUtil.copy(req, Report.class)
                .setReportedAt(LocalDateTime.now())
                .setReportStatus(ReportStatus.PENDING);
        this.reportRepository.save(report);
    }

    @Override
    public PageResult<PostRespVO> getPageReport(int page, int limit) {
        Page<Report> pageReport = this.reportRepository.findAll(PageRequest.of(page - 1, limit));
        List<PostRespVO> postRespVOS = CollUtils.convertList(pageReport.getContent(), r -> {
            return BeanUtil.copy(r, PostRespVO.class);
        });
        return new PageResult<>(page, limit, postRespVOS);
    }

    @Override
    public void processReport(Long reportId) {
        Report report = this.reportRepository.findById(reportId)
                .orElseThrow(() -> exception(404, "not found report"));

        Post post = this.postRepository.findById(report.getPostId())
                .orElseThrow(() -> exception(404, "not found post"));

        post.setDisable(true);
        report.setReportStatus(ReportStatus.PENDING);

        this.reportRepository.save(report);
        this.postRepository.save(post);
    }
}
