package viosmash.service;

import viosmash.controller.series.vo.SeriesCreateReqVO;
import viosmash.controller.series.vo.SeriesRespVO;

import java.util.List;

public interface SeriesService {
    void createSeries(Long userId, SeriesCreateReqVO req);
    List<SeriesRespVO> getListSeries(Long userId);
    void deleteSeries(Long id);
}
