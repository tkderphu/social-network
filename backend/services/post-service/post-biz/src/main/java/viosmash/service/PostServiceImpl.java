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
import viosmash.core.utils.SecurityUtils;
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
import viosmash.notification.api.NotificationApi;
import viosmash.notification.api.NotificationDto;
import viosmash.notification.enums.NotificationType;
import viosmash.notification.enums.TargetType;
import viosmash.object.BeanUtil;
import viosmash.pojo.api.group.GroupDTO;
import viosmash.profile.api.UserApi;
import viosmash.string.StringUtils;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

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
    private final NotificationApi notificationApi;
    @Override
    @Transactional(rollbackFor = ServiceException.class)
    public Post createPost(Long userId, @Valid PostCreateReqVO postCreateReq) {
        Post post = BeanUtil.copy(postCreateReq, Post.class)
                .setUserId(userId).setCreatedDate(LocalDateTime.now())
                .setVotes(0)
                .setHotScore(0d)
                .setVisible(true)
                .setDisable(false);

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
            return mapToResp(post);
        });
    }


    @Override
    public PostRespVO getPostById(Long postId) {
        Post post = this.postRepository.findById(postId)
                .orElseThrow(() -> exception(404, "Post with id " + postId + " not found"));
        PostRespVO postRespVO = mapToResp(post);
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
    public List<PostRespVO> getNewFeeds(Long userId, String type, int page, int limit, int sort) {
        List<Long> groups = Exceptional.process(userId, groupApi::getListGroup, Collections.emptyList());
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Post> postPage;
        if(type.equals("user")) {
              List<Long> recommends = Exceptional.process(userId, friendshipApi::getListRecommendUser, Collections.emptyList());
              postPage = postRepository.findAll(userId, recommends, groups, pageable);
          } else {
            postPage = postRepository.findAll(userId, groups, pageable);
          }
        return CollUtils.convertList(postPage.getContent(), this::mapToResp, (c1, c2) -> {
            if(sort == 0) {
                return c2.getHotScore().compareTo(c1.getHotScore());
            }
            return c2.getCreatedDate().compareTo(c1.getCreatedDate());
        });
    }



    @Override
    public List<PostRespVO> getListPostByGroupId(Long id, int pageNumber, int limit, int type) {
        Pageable pageable = PageRequest.of(
                pageNumber - 1,
                limit
        );

        Page<Post> page = postRepository.findAllByGroupIdAndVisibleAndDisable(
                id,
                true,
                false
                , pageable);

        return CollUtils.convertList(page.getContent(),this::mapToResp, (c1, c2) -> {
            if(type == 0) {
                return c2.getHotScore().compareTo(c1.getHotScore());
            }
            return c2.getCreatedDate().compareTo(c1.getCreatedDate());
        }, pageNumber - 1, limit);
    }

    @Override
    public List<PostRespVO> getListPostByUserIdAndGroupId(Long userId, Long groupId, int page, int limit) {
        Page<Post> pagePost = postRepository.findAllByUserIdAndGroupId(
                userId,
                groupId,
                PageRequest.of(page - 1, limit).withSort(Sort.by("createdDate").descending())
        );

        return CollUtils.convertList(pagePost.getContent(),this::mapToResp);
    }

    @Override
    public List<PostRespVO> getListPostPendingInGroup(Long groupId, int page, int limit) {
        Page<Post> postPage = this.postRepository.findAllByGroupIdAndVisibleAndDisable(
                groupId,
                false,
                false,
                PageRequest.of(page - 1, limit).withSort(Sort.by("createdDate").descending()));
        return CollUtils.convertList(postPage.getContent(), this::mapToResp);
    }

    @Override
    public void updateVisiblePost(Long postId, Boolean isAccept) {
        Post post = this.postRepository.findById(postId)
                .orElseThrow(() -> exception(404, "not found post"));
        if(isAccept) {
            post.setVisible(true);
        } else {
            post.setDisable(true);
        }

        this.postRepository.save(post);

        NotificationDto notificationDto = new NotificationDto()
                .setNotificationType(isAccept ? NotificationType.ACCEPT_POST_IN_GROUP : NotificationType.REJECT_POST_IN_GROUP)
                .setActorId(SecurityUtils.getLoginUserMemberId())
                .setTargetType(TargetType.POST)
                .setTargetId(post.getId())
                .setCreatedAt(LocalDateTime.now())
                .setUserId(post.getUserId());
        this.notificationApi.sendAppNotification(notificationDto);

    }


    private PostRespVO mapToResp(Post post) {
        post.calculateHotScore();
        return BeanUtil.copy(post, PostRespVO.class)
                .setUser(Exceptional.process(post.getUserId(), userApi::getUserById))
                .setGroup(Exceptional.process(post.getGroupId(), groupApi::getGroup))
                .setVotes(0).setShares(0).setComments(0);
    }
}
