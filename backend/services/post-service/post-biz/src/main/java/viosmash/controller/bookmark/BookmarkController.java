package viosmash.controller.bookmark;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.bookmark.vo.BookmarkCreateReqVO;
import viosmash.dal.dataobject.Bookmark;
import viosmash.pojo.CommonResult;
import viosmash.service.BookmarkService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bookmarks")
public class BookmarkController {
    private final BookmarkService bookmarkService;
    @PostMapping
    public CommonResult<Boolean> savePost(@RequestBody BookmarkCreateReqVO req) {
        bookmarkService.savePost(req);
        return CommonResult.success(true);
    }

    @GetMapping("/series/{id}")
    public CommonResult<List<Bookmark>> getListBookmark(@PathVariable("id") Long seriesId) {
        bookmarkService.g
    }
}
