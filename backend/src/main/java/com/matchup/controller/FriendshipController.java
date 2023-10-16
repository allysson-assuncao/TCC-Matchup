package com.matchup.controller;

import com.matchup.dto.FriendDto;
import com.matchup.enums.FriendshipStatus;
import com.matchup.model.Friendship;
import com.matchup.service.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/friendship")
public class FriendshipController {

    private final FriendshipService friendshipService;

    @Autowired
    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @PostMapping("/solicitation-response/{accepted}")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> solicitationResponse(@RequestBody Map<String, Long> friendshipId, @PathVariable String accepted) {
        return new ResponseEntity<>(friendshipService.sendFriendshipSolicitationResponseNotification(friendshipId.get("friendshipId"), Boolean.parseBoolean(accepted)), HttpStatus.OK);
    }

    @GetMapping("{user1Id}/is-friends-with/{user2Id}")
    public ResponseEntity<Boolean> isFriendsWith(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return new ResponseEntity<>(friendshipService.existsFriendshipByUsersId(user1Id, user2Id), HttpStatus.OK);
    }

    @GetMapping("get-friendship-by/{user1Id}/and/{user2Id}")
    public ResponseEntity<Friendship> getFriendshipByUsers(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return new ResponseEntity<>(friendshipService.getFriendship(user1Id, user2Id), HttpStatus.OK);
    }

    @GetMapping("get-friends-by/{userId}")
    public ResponseEntity<List<FriendDto>> getFriendsByUserId(@PathVariable Long userId) {
        return new ResponseEntity<>(friendshipService.getFriendsByUserId(userId), HttpStatus.OK);
    }

    @DeleteMapping("/end-friendship-between/{user1Id}/and/{user2Id}")
    public ResponseEntity<Boolean> endFriendship(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return new ResponseEntity<>(friendshipService.endFriendship(user1Id, user2Id), HttpStatus.OK);
    }

}
