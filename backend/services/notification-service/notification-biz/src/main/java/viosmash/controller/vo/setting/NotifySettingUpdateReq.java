package viosmash.controller.vo.setting;

import lombok.Data;
import viosmash.dal.dataobject.NotifySetting;

@Data
public class NotifySettingUpdateReq {
    private NotifySetting.Setting comment; //reply, comment
    private NotifySetting.Setting friend; //user receive request then will be notified
    private NotifySetting.Setting reaction; //reaction
    private NotifySetting.Setting chat; //chat react
    private NotifySetting.Setting post; //receive notify when your friends create new post to bulletin board
    @Data
    public static class Setting {
        private Boolean enableNotify;
        private Boolean enableSound;
        private Boolean enablePushNotification;
    }
}
