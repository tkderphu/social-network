package viosmash.aop;

import viosmash.enums.GroupRole;

public @interface GroupPermission {
    GroupRole specificRole() default GroupRole.MEMBER;
}
