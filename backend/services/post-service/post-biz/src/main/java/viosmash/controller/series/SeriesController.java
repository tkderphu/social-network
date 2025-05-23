package viosmash.controller.series;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.series.vo.SeriesCreateReqVO;
import viosmash.controller.series.vo.SeriesRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.pojo.CommonResult;
import viosmash.service.SeriesService;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/series")
@RestController
public class SeriesController {
    private final SeriesService seriesService;

    @GetMapping
    public CommonResult<List<SeriesRespVO>> getListSeries() {
        List<SeriesRespVO> series = seriesService.getListSeries(SecurityUtils.getLoginUserMemberId());
        return CommonResult.success(series);
    }

    @PostMapping
    public CommonResult<Boolean> createSeries(@RequestBody SeriesCreateReqVO req) {
        seriesService.createSeries(SecurityUtils.getLoginUserMemberId(), req);
        return CommonResult.success(true);
    }
    @DeleteMapping("/{id}")
    public CommonResult<Boolean> deleteSeries(@PathVariable("id") Long id) {
        seriesService.deleteSeries(id);
        return CommonResult.success(true);
    }
}
