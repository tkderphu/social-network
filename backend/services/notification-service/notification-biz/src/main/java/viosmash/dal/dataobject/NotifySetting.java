package viosmash.dal.dataobject;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import viosmash.converter.JsonObjectConverter;

@Table(name = "tblNotifySetting")
@Data
@Entity
@NoArgsConstructor
@Accessors(chain = true)
public class NotifySetting {
    @Id
    private Long userId;
    @Convert(converter = JsonObjectConverter.class)
    private Setting comment; //reply, comment

    @Convert(converter = JsonObjectConverter.class)
    private Setting friend; //user receive request then will be notified

    @Convert(converter = JsonObjectConverter.class)
    private Setting reaction; //reaction

    @Convert(converter = JsonObjectConverter.class)
    private Setting chat; //chat react

    @Convert(converter = JsonObjectConverter.class)
    private Setting post; //receive notify when your friends create new post to bulletin board

    public NotifySetting(Long userId) {
        this.userId = userId;
        this.comment = new Setting();
        this.friend = new Setting();
        this.reaction = new Setting();
        this.chat = new Setting();
        this.post = new Setting();
    }

    @Data
    public static class Setting {
        private Boolean enableNotify;
        private Boolean enableSound;
        private Boolean enablePushNotification;

        public Setting() {
            this.enableNotify = true;
            this.enableSound = true;
            this.enablePushNotification = true;
        }
    }
}
