package viosmash.post.api;

import viosmash.pojo.CommonResult;

import java.util.Collection;
import java.util.List;

public interface PostApi {

    CommonResult<List<PostDTO>> getPagePostByAuthorIds(Collection<Long> userIds);
}
