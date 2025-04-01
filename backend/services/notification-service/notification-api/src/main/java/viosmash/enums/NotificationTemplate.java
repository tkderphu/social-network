package viosmash.enums;

public enum NotificationTemplate {

    ACCEPTED_REQUEST_FRIEND("accepted_request_friend.html"),
    CREATED_REQUEST_FRIEND("created_request_friend.html"),
    CREATED_REACTION("created_reaction.html"),
    CREATED_COMMENT("created_comment"),
    CREATED_REPLY_COMMENT("created_reply_commented"),
    FORGOT_PASSWORD("forgot_password.html");

    private final String htmlName;


    NotificationTemplate(String htmlName) {
        this.htmlName = htmlName;
    }

    public String getHtmlName() {
        return htmlName;
    }
}
