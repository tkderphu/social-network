package viosmash.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.collection.CollUtils;
import viosmash.controller.post.vo.PostCreateReqVO;
import viosmash.controller.post.vo.PostRespVO;
import viosmash.dal.dataobject.Post;
import viosmash.dal.dataobject.PostTag;
import viosmash.dal.dataobject.Tag;
import viosmash.dal.repo.PostRepository;
import viosmash.dal.repo.PostTagRepository;
import viosmash.dal.repo.TagRepository;
import viosmash.group.api.GroupApi;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;
import viosmash.profile.api.UserApi;
import viosmash.string.StringUtils;

import java.time.LocalDateTime;
import java.util.List;

import static viosmash.exception.Exceptional.process;
import static viosmash.exception.utils.ServiceUtils.exception;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final UserApi userApi;
    private final GroupApi groupApi;
    private final PostTagRepository postTagRepository;
    private final TagRepository tagRepository;
    @Override
    @Transactional
    public Post createPost(Long userId, @Valid PostCreateReqVO postCreateReq) {
        Post post = BeanUtil.copy(postCreateReq, Post.class)
                .setUserId(userId).setCreatedDate(LocalDateTime.now());
        this.postRepository.save(post);
        CollUtils.convertList(postCreateReq.getTagNames(), tagName -> {
            Tag tag = tagRepository.findByName(StringUtils.lower(tagName));
            if(tag == null) {
                tag = new Tag().setCreatedAt(LocalDateTime.now())
                        .setName(StringUtils.lower(tagName));
                this.tagRepository.save(tag);
            }
            postTagRepository.save(new PostTag().setPostId(post.getId()))
                    .setTagName(tag.getName());
            return null;
        });
        return post;
    }

    @Override
    public Post updatePost(Long postId, PostCreateReqVO req) {
        return null;
    }


    @Override
    public PageResult<PostRespVO> getListPostByUserId(Long userId, int pageNumber, int limit) {
        Pageable pageable = PageRequest.of(
                pageNumber - 1,
                limit,
                Sort.by("createdDate").descending()
        );

        Page<Post> page = postRepository.findAllByUserId(userId, pageable);

        return new PageResult<>(pageNumber, limit, CollUtils.convertList(page.getContent(), post -> {
            return BeanUtil.copy(post, PostRespVO.class)
                    .setUser(process(post.getUserId(), userApi::getUserById))
//                    .setGroup(process(post.getGroupId(), groupApi::getGroup))
//                    .setSharePost(getPostById(post.getSharePostId()))
                    .setVotes(0).setShares(0).setComments(0);
        }));
    }


    @Override
    public PostRespVO getPostById(Long postId) {
        Post post = this.postRepository.findById(postId)
                .orElseThrow(() -> exception(404, "Post with id " + postId + " not found"));
        PostRespVO postRespVO = BeanUtil.copy(post, PostRespVO.class)
                .setUser(process(post.getUserId(), userApi::getUserById))
//                .setGroup(process(post.getGroupId(), groupApi::getGroup))
//                .setSharePost(getPostById(post.getSharePostId()))
                .setVotes(0).setShares(0).setComments(0);
        log.info("data post detail: {}", postRespVO);
        return postRespVO;
    }





    @Override
    public void deletePost(Long postId) {
        this.postRepository.deleteAllBySharePostId(postId);
        this.postRepository.deleteById(postId);
    }

    @Override
    public List<Post> getNewFeeds(Long userId) {
        return List.of();
    }
}
