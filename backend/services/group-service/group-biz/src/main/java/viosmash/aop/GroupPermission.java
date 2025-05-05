package viosmash.aop;

import viosmash.group.enums.GroupRole;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface GroupPermission {
    GroupRole specificRole() default GroupRole.MEMBER;
}
