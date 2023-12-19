package com.matchup.controller;

import com.matchup.dto.FriendDto;
import com.matchup.dto.NotificationDto;
import com.matchup.dto.SolicitationResponseDto;
import com.matchup.enums.FriendshipStatus;
import com.matchup.model.Friendship;
import com.matchup.service.FriendshipService;
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
@RequestMapping("/api/friendship")
public class FriendshipController {

    private final FriendshipService friendshipService;
    private SimpMessagingTemplate simpMessagingTemplate;

    private final NotificationService notificationService;

    @Autowired
    public FriendshipController(FriendshipService friendshipService, SimpMessagingTemplate simpMessagingTemplate, NotificationService notificationService) {
        this.friendshipService = friendshipService;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.notificationService = notificationService;
    }

    /*@PostMapping("/solicitation-response/{accepted}")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> solicitationResponse(@RequestBody Map<String, Long> friendshipId, @PathVariable String accepted) {
        return new ResponseEntity<>(friendshipService.sendFriendshipSolicitationResponseNotification(friendshipId.get("friendshipId"), Boolean.parseBoolean(accepted)), HttpStatus.OK);
    }*/

    @MessageMapping("/solicitation-response/")
    public NotificationDto solicitationResponse(SolicitationResponseDto solicitationResponseDto) {
        System.out.println("Solicitação aceita");
        long notificationId = notificationService.getFriendshipNotificationIdByUsers(solicitationResponseDto.getReceiverId(), solicitationResponseDto.getSenderId());

        NotificationDto notificationDto = friendshipService.sendFriendshipSolicitationResponseNotification(
                solicitationResponseDto.getReceiverId(), solicitationResponseDto.getSenderId(), solicitationResponseDto.isAccepted());

        if(notificationDto != null){
            simpMessagingTemplate.convertAndSendToUser(
                    notificationDto.getReceiverId()+"", "/queue/notification/friendship-solicitation", notificationDto);
        }
        simpMessagingTemplate.convertAndSendToUser(
                solicitationResponseDto.getSenderId()+"", "/queue/notification/delete", notificationId);
        return notificationDto;
    }

    @GetMapping("/{user1Id}/is-friends-with/{user2Id}")
    public ResponseEntity<Boolean> isFriendsWith(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return new ResponseEntity<>(friendshipService.existsFriendshipByUsersId(user1Id, user2Id), HttpStatus.OK);
    }

    @GetMapping("/get-friendship-by/{user1Id}/and/{user2Id}")
    public ResponseEntity<Friendship> getFriendshipByUsers(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return new ResponseEntity<>(friendshipService.getFriendship(user1Id, user2Id), HttpStatus.OK);
    }

    @GetMapping("/get-friends")
    public ResponseEntity<List<FriendDto>> getFriendsByUserId(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(friendshipService.getFriendsByUserId(userDetails), HttpStatus.OK);
    }

    @DeleteMapping("/end-friendship-between/{user1Id}/and/{user2Id}")
    public ResponseEntity<Boolean> endFriendship(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return new ResponseEntity<>(friendshipService.endFriendship(user1Id, user2Id), HttpStatus.OK);
    }

}
