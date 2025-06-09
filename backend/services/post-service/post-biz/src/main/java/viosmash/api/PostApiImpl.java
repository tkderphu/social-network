package viosmash.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.dal.repo.PostRepository;
import viosmash.pojo.api.post.PostDTO;
import viosmash.post.api.PostApi;

import java.util.Collection;
import java.util.List;

@RequestMapping(PostApi.PREFIX)
@RestController
@RequiredArgsConstructor
public class PostApiImpl implements PostApi {

    private final PostRepository postRepository;

    @Override
    public List<PostDTO> getListPostByAuthors(Collection<Long> userIds) {
        return List.of();
    }

    @Override
    public List<PostDTO> getListPostByIds(Collection<Long> postIds) {
        return List.of();
    }

    @Override
    public PostDTO getPostById(Long id) {
        return null;
    }

}
