package com.matchup.controller;

import com.matchup.dto.NotificationDto;
import com.matchup.model.notification.Notification;
import com.matchup.service.FriendshipService;
import com.matchup.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    private final FriendshipService friendshipService;

    @Autowired
    public NotificationController(NotificationService notificationService, FriendshipService friendshipService) {
        this.notificationService = notificationService;
        this.friendshipService = friendshipService;
    }

    @PostMapping("/send-solicitation")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> sendFriendshipSolicitationNotification(@RequestBody Map<String, Long> requestBody) {
        return new ResponseEntity<>(notificationService.sendFriendshipSolicitationNotification(requestBody.get("senderId"), requestBody.get("receiverId")), HttpStatus.OK);
    }

    @PostMapping("/solicitation-response/{accepted}")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> solicitationResponse(@RequestBody Map<String, Long> friendshipId, @PathVariable String accepted) {
        return new ResponseEntity<Boolean>(friendshipService.sendFriendshipSolicitationResponseNotification(friendshipId.get("friendshipId"), Boolean.parseBoolean(accepted)), HttpStatus.OK);
    }

    @GetMapping("/get-by-user-id/{userId}")
    @PostAuthorize("true")
    public ResponseEntity<List<NotificationDto>> getNotificationsByUserId(@PathVariable long userId) {
        return new ResponseEntity<>(notificationService.getNotificationsByUserId(userId), HttpStatus.OK);
    }

    @DeleteMapping("/delete-notification-by-id/{notificationId}")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> deleteNotificationById(@PathVariable long notificationId) {
        return new ResponseEntity<>(notificationService.deleteNotificationById(notificationId), HttpStatus.OK);
    }

}
