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
}
