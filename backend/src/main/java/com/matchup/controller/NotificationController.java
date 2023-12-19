package com.matchup.controller;

import com.matchup.dto.FriendshipSolicitationDto;
import com.matchup.dto.MessageDto;
import com.matchup.dto.NotificationDto;
import com.matchup.dto.SolicitationResponseDto;
import com.matchup.model.notification.FriendshipSolicitationNotification;
import com.matchup.model.notification.Notification;
import com.matchup.service.FriendshipService;
import com.matchup.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    private final FriendshipService friendshipService;

    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public NotificationController(NotificationService notificationService, FriendshipService friendshipService, SimpMessagingTemplate simpMessagingTemplate) {
        this.notificationService = notificationService;
        this.friendshipService = friendshipService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }


    /*@PostMapping("/send-solicitation")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> sendFriendshipSolicitationNotification(@RequestBody Map<String, Long> requestBody) {
        return new ResponseEntity<>(notificationService.sendFriendshipSolicitationNotification(requestBody.get("senderId"), requestBody.get("receiverId")), HttpStatus.OK);
    }*/

    @MessageMapping("/send/friendship-solicitation")
    public NotificationDto sendFriendshipSolicitationNotification(FriendshipSolicitationDto friendshipSolicitationDto) {
        NotificationDto notificationDto = notificationService.sendFriendshipSolicitationNotification(
                friendshipSolicitationDto.getSenderId(), friendshipSolicitationDto.getReceiverId());

        System.out.println("Notificação salva no BD");
        simpMessagingTemplate.convertAndSendToUser(
                notificationDto.getReceiverId()+"", "/queue/notification/friendship-solicitation", notificationDto);
        return notificationDto;
    }

    /*@PostMapping("/solicitation-response/{accepted}")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> solicitationResponse(@RequestBody Map<String, Long> friendshipId, @PathVariable String accepted) {
        return new ResponseEntity<Boolean>(friendshipService.sendFriendshipSolicitationResponseNotification(friendshipId.get("friendshipId"), Boolean.parseBoolean(accepted)), HttpStatus.OK);
    }*/

    /*@MessageMapping("/solicitation-response/")
    public NotificationDto solicitationResponse(SolicitationResponseDto solicitationResponseDto) {
        System.out.println("Solicitação aceita");
        NotificationDto notificationDto = notificationService.sendFriendshipSolicitationResponseNotification(
                solicitationResponseDto.getReceiverId(), solicitationResponseDto.getSenderId(), solicitationResponseDto.isAccepted());
        simpMessagingTemplate.convertAndSendToUser(
                notificationDto.getReceiverId()+"", "/queue/notification/friendship-solicitation", notificationDto);
        return notificationDto;
    }*/

    @GetMapping("/get")
    public ResponseEntity<List<NotificationDto>> getNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(notificationService.getNotificationsByUsername(userDetails), HttpStatus.OK);
    }

    @GetMapping("/get-unseen-count-by-user-id/{userId}")
    public ResponseEntity<Integer> getUnseenNotificationsCount(@PathVariable long userId) {
        return new ResponseEntity<>(notificationService.getNotificationsUnseenCountByUserId(userId), HttpStatus.OK);
    }

    @DeleteMapping("/delete-notification-by-id/{notificationId}")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> deleteNotificationById(@PathVariable long notificationId) {
        return new ResponseEntity<>(notificationService.deleteNotificationById(notificationId), HttpStatus.OK);
    }

}
