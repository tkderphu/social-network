package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.controller.tag.vo.TagRespVO;
import viosmash.dal.dataobject.Tag;
import viosmash.dal.repo.PostTagRepository;
import viosmash.dal.repo.TagRepository;
import viosmash.object.BeanUtil;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService{
    private final TagRepository tagRepository;
    private final PostTagRepository postTagRepository;
    @Override
    public List<Tag> search(String name) {
        return tagRepository.findByNameContaining(name);
    }

    @Override
    public TagRespVO getTag(String name) {
        Tag tag = tagRepository.findByName(name);
        TagRespVO tagResp = BeanUtil.copy(tag, TagRespVO.class);
        tagResp.setCountPost(postTagRepository.countByTagName(tag.getName()));
        //
        return tagResp;
    }
}
