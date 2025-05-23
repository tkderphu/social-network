package viosmash.service;

import viosmash.controller.tag.vo.TagRespVO;
import viosmash.dal.dataobject.Tag;

import java.util.List;

public interface TagService {
    List<Tag> search(String name);
    TagRespVO getTag(String name);
}
