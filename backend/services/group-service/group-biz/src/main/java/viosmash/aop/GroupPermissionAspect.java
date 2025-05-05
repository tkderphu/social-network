package viosmash.aop;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.group.enums.GroupRole;
import viosmash.service.member.UserMemberGroupService;

import static viosmash.exception.utils.ServiceUtils.exception;

@Aspect
@RequiredArgsConstructor
@Component
public class GroupPermissionAspect {

    private final UserMemberGroupService userMemberGroupService;

    @Around("@annotation(groupPermission)")
    public Object groupPermission(ProceedingJoinPoint joinPoint, GroupPermission groupPermission) throws Throwable {
        try {
            Object[] args = joinPoint.getArgs();

            UserMemberGroup userMemberGroup = userMemberGroupService
                    .getMember(SecurityUtils.getLoginUserMemberId(), (Long) args[0]);
            GroupRole role = userMemberGroup.getGroupRole();
            if(groupPermission.specificRole().equals(GroupRole.MEMBER)) {
                if(role.equals(GroupRole.OWNER) || role.equals(GroupRole.REVIEWER)) {
                    Object result = joinPoint.proceed();
                    return result;
                }
            } else {
                if(role.equals(GroupRole.OWNER)) {
                    Object result = joinPoint.proceed();
                    return result;
                }
            }
            throw exception(HttpStatus.FORBIDDEN.value(), "You can't access to this function");
        }
        catch (Throwable e) {
            throw e;
        }
    }

}
