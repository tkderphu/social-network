package viosmash;

public interface EventConstant {
    /**
     * queue: que
     * direct-exchange: dir
     * routing: rou
     */

    String QUEUE_SUFFIX = "que";
    String DIRECT_SUFFIX = "dir";
    String ROU_SUFFIX = "rou";

    /**
     * Event
     */
    String USER_CREATED = "user_created_";
    String FORGOT_PASSWORD = "forgot_password_";

    String CREATE_REACTION = "create_reaction_";
    String ACCEPT_FRIENDS_REQUEST = "accept_friend_request_";
    String CREATE_REQUEST_FRIEND_REQUEST = "create_request_friend_request_";
    String CREATE_COMMENT = "create_comment_";
    String CREATE_REPLY_COMMENT = "create_comment_reply_";

    String FOLLOW_USER = "follow_user_";
}
