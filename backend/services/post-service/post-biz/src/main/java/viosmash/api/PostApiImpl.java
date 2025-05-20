package viosmash.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.post.api.PostApi;
import viosmash.post.api.PostDTO;

import java.util.Collection;
import java.util.List;

@RequestMapping(PostApi.PREFIX)
@RestController
public class PostApiImpl implements PostApi {
    @Override
    public List<PostDTO> getListPostByAuthors(Collection<Long> userIds) {
        return List.of();
    }

    @Override
    public List<PostDTO> getListPostByIds(Collection<Long> postIds) {
        return List.of();
    }
}
