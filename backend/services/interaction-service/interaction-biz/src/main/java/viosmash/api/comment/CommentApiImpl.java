package viosmash.api.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.interaction.api.comment.CommentApi;
import viosmash.interaction.api.comment.CommentDTO;
import viosmash.services.CommentService;


@RequiredArgsConstructor
@RequestMapping(CommentApi.PREFIX)
@RestController
public class CommentApiImpl implements CommentApi {

    private final CommentService commentService;

    @Override
    @GetMapping("/count/{postId}")
    public int count(@PathVariable("postId") Long objId){
        return commentService.countByPost(objId);
    }

    @Override
    public CommentDTO getById(Long id) {
        return null;
    }
}
