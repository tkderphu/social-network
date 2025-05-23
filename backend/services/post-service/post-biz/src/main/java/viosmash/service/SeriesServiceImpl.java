package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.collection.CollUtils;
import viosmash.controller.series.vo.SeriesCreateReqVO;
import viosmash.controller.series.vo.SeriesRespVO;
import viosmash.dal.dataobject.Series;
import viosmash.dal.repo.BookmarkRepository;
import viosmash.dal.repo.SeriesRepository;
import viosmash.object.BeanUtil;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeriesServiceImpl implements SeriesService{
    private final SeriesRepository seriesRepository;
    private final BookmarkRepository bookmarkRepository;
    @Override
    public void createSeries(Long userId, SeriesCreateReqVO req) {
        Series series = new Series().setName(req.getName())
                .setUserId(userId);
        this.seriesRepository.save(series);
    }

    @Override
    public List<SeriesRespVO> getListSeries(Long userId) {
        List<Object[]> seriesAgg = this.seriesRepository.findAllByUserId(userId);
        return CollUtils.convertList(seriesAgg, objs -> {
            SeriesRespVO seriesRespVO = BeanUtil.copy(objs[0], SeriesRespVO.class);
            seriesRespVO.setCountBookmark((Integer) objs[1]);
            return seriesRespVO;
        });
    }

    @Override
    public void deleteSeries(Long id) {
        this.bookmarkRepository.deleteAllBySeriesId(id);
        this.seriesRepository.deleteById(id);
    }
}
