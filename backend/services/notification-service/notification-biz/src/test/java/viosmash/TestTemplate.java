package viosmash;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.thymeleaf.TemplateEngine; // base interface
import org.thymeleaf.context.Context;

public class TestTemplate  extends BaseTest{
    @Autowired
    private TemplateEngine templateEngine;

    @Test
    void testAcceptedRequestFriend() {
        Context context = new Context();
        context.setVariable("name", "John");
        String html = templateEngine.process("accepted_request_friend.html", context);
        System.out.println(html);
    }

}

