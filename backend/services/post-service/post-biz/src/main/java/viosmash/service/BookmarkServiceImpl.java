package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.collection.CollUtils;
import viosmash.controller.bookmark.vo.BookmarkCreateReqVO;
import viosmash.controller.bookmark.vo.BookmarkRespVO;
import viosmash.dal.dataobject.Bookmark;
import viosmash.dal.repo.BookmarkRepository;
import viosmash.object.BeanUtil;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService{
    private final BookmarkRepository bookmarkRepository;
    private final PostService postService;
    @Override
    public void savePost(BookmarkCreateReqVO req) {
        Bookmark bookmark = new Bookmark()
                .setBookmarkedAt(LocalDateTime.now())
                .setPostId(req.getPostId())
                .setSeriesId(req.getSeriesId());
        this.bookmarkRepository.save(bookmark);
    }

    @Override
    public List<BookmarkRespVO> getListBookmark(Long seriesId) {
        return CollUtils.convertList(this.bookmarkRepository.findAllBySeriesId(seriesId), bookmark -> {
            return  BeanUtil.copy(bookmark, BookmarkRespVO.class);
        });
    }

    @Override
    public void deleteBookmark(Long id) {
        this.bookmarkRepository.deleteById(id);
    }
}
