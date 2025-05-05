package viosmash.post.api;

import java.util.Collection;

public interface PostApi {

    void getPagePostByAuthorIds(Collection<Long> userIds);
}
