package viosmash.controller.group;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import viosmash.profile.api.UserApi;
import viosmash.controller.group.vo.GroupCreateReqVO;
import viosmash.controller.group.vo.GroupRespVO;
import viosmash.controller.group.vo.GroupUpdateReqVO;
import viosmash.dal.dataobject.Group;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.service.group.GroupService;
import viosmash.service.member.UserMemberGroupService;

import java.util.List;

import static viosmash.collection.CollUtils.convertList;
import static viosmash.core.utils.SecurityUtils.getLoginUserMemberId;
import static viosmash.pojo.CommonResult.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/groups")
@Validated
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
                    .setOwner(userApi.getUserById(group.getOwnerId()))
                    .setNumberOfMembers(userMemberGroupService.countMember(groupId));
        }));
    }

}
