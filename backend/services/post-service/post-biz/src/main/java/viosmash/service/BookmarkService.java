package viosmash.service;

import viosmash.controller.bookmark.vo.BookmarkCreateReqVO;
import viosmash.controller.bookmark.vo.BookmarkRespVO;
import viosmash.dal.dataobject.Bookmark;

import java.util.List;

public interface BookmarkService {
    void savePost(BookmarkCreateReqVO req);
    List<BookmarkRespVO> getListBookmark(Long seriesId);
    void deleteBookmark(Long id);
}
