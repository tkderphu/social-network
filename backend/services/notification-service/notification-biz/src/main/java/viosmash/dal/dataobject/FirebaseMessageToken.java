package viosmash.dal.dataobject;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "FirebaseMessageToken")
@Accessors(chain = true)
@Data
public class FirebaseMessageToken {
    @Id
    private Long userId;
    private String token;
}
