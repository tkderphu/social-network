package viosmash.controller.group;

import jakarta.validation.Valid;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.pojo.api.profile.UserDTO;
import viosmash.profile.api.UserApi;
import viosmash.controller.group.vo.GroupCreateReqVO;
import viosmash.controller.group.vo.GroupRespVO;
import viosmash.controller.group.vo.GroupUpdateReqVO;
import viosmash.dal.dataobject.Group;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.service.group.GroupService;
import viosmash.service.member.UserMemberGroupService;

import java.util.Collection;
import java.util.List;

import static viosmash.collection.CollUtils.convertList;
import static viosmash.core.utils.SecurityUtils.getLoginUserMemberId;
import static viosmash.pojo.CommonResult.success;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;
    private final UserApi userApi;
    private final UserMemberGroupService userMemberGroupService;
    @PostMapping
    public CommonResult<Long> createGroup(@Valid @RequestBody GroupCreateReqVO req) {
        Long groupId = groupService.createGroup(getLoginUserMemberId(), req);
        return success(groupId);
    }



    @PutMapping
    public CommonResult<Boolean> updateGroup(@Valid @RequestBody GroupUpdateReqVO req) {
        groupService.updateGroup(req.getId(), req.getName(), req.getGroupType(), req.getDescription());
        return success(true);
    }

    @GetMapping("/detail/{id}")
    public CommonResult<GroupRespVO> getDetailGroup(@PathVariable("id") Long groupId) {
        Group group = groupService.getGroup(groupId);
        UserDTO user = userApi.getUserById(group.getOwnerId());
        GroupRespVO groupRespVO = BeanUtil.copy(group, GroupRespVO.class)
                .setNumberOfMembers(userMemberGroupService.countMember(group.getId()))
                .setOwner(user);
        log.info("group detail: {}",groupRespVO);
        return success(groupRespVO);
    }

    @GetMapping("/owner")
    public CommonResult<List<GroupRespVO>> getListGroupByOwner() {
        List<GroupRespVO> groupResp = convertList(groupService.getListGroupByOwner(getLoginUserMemberId()), group -> {
            return BeanUtil.copy(group, GroupRespVO.class)
                    .setNumberOfMembers(userMemberGroupService.countMember(group.getId()));
        });
        return success(groupResp);
    }

    @GetMapping("/joined")
    public CommonResult<List<GroupRespVO>> getListGroupJoined() {
        return success(convertList(userMemberGroupService.getListGroup(getLoginUserMemberId()), groupId -> {
            Group group = groupService.getGroup(groupId);
            return BeanUtil.copy(group, GroupRespVO.class)
                    .setNumberOfMembers(userMemberGroupService.countMember(groupId));
        }));
    }

}
