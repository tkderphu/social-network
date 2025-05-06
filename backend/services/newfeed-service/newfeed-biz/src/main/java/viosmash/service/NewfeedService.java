package viosmash.service;

import viosmash.dal.dataobject.NewfeedItem;
import viosmash.pojo.PageResult;

public interface NewfeedService {

    PageResult<NewfeedItem> getNewfeed(Long userId);

}
