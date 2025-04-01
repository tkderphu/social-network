package viosmash.controller;

import org.springframework.web.bind.annotation.*;
import viosmash.service.firebase.FCMService;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin("*")
public class NotificationController {
    private final FCMService fcmService;

    public NotificationController(FCMService fcmService) {
        this.fcmService = fcmService;
    }

    @GetMapping("/send")
    public String sendNotification(@RequestParam String token, 
                                   @RequestParam String title, 
                                   @RequestParam String body) {
        fcmService.sendNotification(title, body, token);
        return "Notification Sent!";
    }
}
