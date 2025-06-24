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
import viosmash.exception.Exceptional;
import viosmash.exception.ServiceException;
import viosmash.friendship.api.FriendshipApi;
import viosmash.group.api.GroupApi;
import viosmash.object.BeanUtil;
import viosmash.pojo.api.group.GroupDTO;
import viosmash.profile.api.UserApi;
import viosmash.string.StringUtils;

import java.time.LocalDateTime;
import java.util.Collections;
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
    private final FriendshipApi friendshipApi;
    @Override
    @Transactional(rollbackFor = ServiceException.class)
    public Post createPost(Long userId, @Valid PostCreateReqVO postCreateReq) {
        Post post = BeanUtil.copy(postCreateReq, Post.class)
                .setUserId(userId).setCreatedDate(LocalDateTime.now())
                .setVotes(0)
                .setHotScore(0d)
                .setVisible(true);

        if(post.getGroupId() != null) {
            GroupDTO group = groupApi.getGroup(post.getGroupId());
            if(group.getEnableAutoReviewPost()) {
                post.setVisible(true);
            } else {
                post.setVisible(false);
            }
        }

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
    public List<PostRespVO> getListPostByUserId(Long userId, int pageNumber, int limit) {
        Pageable pageable = PageRequest.of(
                pageNumber - 1,
                limit,
                Sort.by("createdDate").descending()
        );

        Page<Post> page = postRepository.findAllByUserId(userId, pageable);

        return CollUtils.convertList(page.getContent(), post -> {
            if(post.getVisible() == null || !post.getVisible()) return null;
            return BeanUtil.copy(post, PostRespVO.class)
                    .setUser(process(post.getUserId(), userApi::getUserById))
                    .setGroup(process(post.getGroupId(), groupApi::getGroup))
//                    .setSharePost(getPostById(post.getSharePostId()))
                    .setVotes(0).setShares(0).setComments(0);
        });
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
    public void updateVote(Long postId, int votes) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> exception(404, "not found post"));
        post.setVotes(votes);
        post.calculateHotScore();
        this.postRepository.save(post);
    }

    @Override
    public List<PostRespVO> getNewFeeds(Long userId, int page, int limit) {
        List<Long> recommends = Exceptional.process(userId, friendshipApi::getListRecommendUser, Collections.emptyList());
        List<Long> groups = Exceptional.process(userId, groupApi::getListGroup, Collections.emptyList());
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Post> postPage = postRepository.findAll(userId, recommends, groups, pageable);

        return CollUtils.convertList(postPage.getContent(), post -> {
            PostRespVO postResp = BeanUtil.copy(post, PostRespVO.class)
                    .setUser(Exceptional.process(post.getUserId(), userApi::getUserById))
                    .setGroup(Exceptional.process(post.getGroupId(), groupApi::getGroup));
            return postResp;
        });
    }

    @Override
    public List<PostRespVO> getListPostByGroupId(Long id, int pageNumber, int limit, int type) {
        Pageable pageable = PageRequest.of(
                pageNumber - 1,
                limit,
                type == 0 ? Sort.by("hotScore").descending() : Sort.by("createdDate").ascending()
        );

        Page<Post> page = postRepository.findAllByGroupId(id, pageable);

        return CollUtils.convertList(page.getContent(),post -> {
            if(post.getVisible() == null || !post.getVisible()) return null;
            return BeanUtil.copy(post, PostRespVO.class)
                    .setUser(process(post.getUserId(), userApi::getUserById))
                    .setGroup(process(post.getGroupId(), groupApi::getGroup))
//                    .setSharePost(getPostById(post.getSharePostId()))
                    .setVotes(0).setShares(0).setComments(0);
        });
    }
}
