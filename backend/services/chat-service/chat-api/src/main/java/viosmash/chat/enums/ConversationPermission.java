package viosmash.chat.enums;

public @interface ConversationPermission {
    Role role() default Role.OWNER;
    String errorMessage();
    int conversationIdPosition() default 0;
}
