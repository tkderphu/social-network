package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.pojo.CommonResult;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/groups")
public class GroupController {

    @PreAuthorize("@gp.hasRole('REVIEWER')")
    public CommonResult<?> acceptMember() {

    }

    @PreAuthorize("@gp.hasRole('REVIEWER')")
    public CommonResult<?> acceptPost() {

    }

    @PreAuthorize("@gp.hasRole('OWNER')")
    public CommonResult<?> updatePermissionToUser() {

    }

    @PreAuthorize("@gp.hasRole('OWNER')")
    public CommonResult<?> updateWhetherPostIsInspectedOrNot() {

    }

    public CommonResult<?> createGroup() {

    }

    @PreAuthorize("@gp.hasRole('OWNER')")
    public CommonResult<?> deleteGroup() {

    }

    public CommonResult<?>
}
