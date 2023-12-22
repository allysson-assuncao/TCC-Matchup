package com.matchup.controller;

import com.matchup.dto.EndFriendshipDto;
import com.matchup.dto.FriendDto;
import com.matchup.dto.NotificationDto;
import com.matchup.dto.SolicitationResponseDto;
import com.matchup.enums.FriendshipStatus;
import com.matchup.model.Friendship;
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
        long notificationId = notificationService.getFriendshipNotificationIdByUsers(solicitationResponseDto.getReceiverId(), solicitationResponseDto.getSenderId());
        System.out.println("Notification ID:" + notificationId);
        NotificationDto notificationDto = friendshipService.sendFriendshipSolicitationResponseNotification(
                solicitationResponseDto.getReceiverId(), solicitationResponseDto.getSenderId(), solicitationResponseDto.isAccepted());
        System.out.println(notificationDto);
        if(notificationDto != null){
            simpMessagingTemplate.convertAndSendToUser(
                    notificationDto.getReceiverId()+"", "/queue/notification/friendship-solicitation", notificationDto);
        }else{
            simpMessagingTemplate.convertAndSendToUser(
                    solicitationResponseDto.getReceiverId()+"",
                    "/queue/friendship-ended",
                    solicitationResponseDto.getSenderId()+"");
        }

        simpMessagingTemplate.convertAndSendToUser(
                solicitationResponseDto.getSenderId()+"", "/queue/notification/delete", notificationId);
        return notificationDto;
    }

    @MessageMapping("/friendship/end")
    public EndFriendshipDto endFriendship(EndFriendshipDto endFriendshipDto) {
        System.out.println("FRIENDSHIP ENDED!!!");
        if(friendshipService.endFriendship(endFriendshipDto.getReceiverId(), endFriendshipDto.getSenderId())){
            simpMessagingTemplate.convertAndSendToUser(
                    endFriendshipDto.getReceiverId()+"",
                    "/queue/friendship-ended",
                    endFriendshipDto.getSenderId()+"");
        }
        return null;

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



}
