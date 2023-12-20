package com.matchup.controller;

import com.matchup.dto.BlockDto;
import com.matchup.dto.EndFriendshipDto;
import com.matchup.dto.UnblockDto;
import com.matchup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/")
public class BlockController {

    private final UserService userService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public BlockController(UserService userService, SimpMessagingTemplate simpMessagingTemplate) {
        this.userService = userService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    /*@PostMapping("/block")
    public ResponseEntity<Boolean> block(@RequestBody Map<String, Long> requestBody) {
        return new ResponseEntity<>(userService.blockUserByBlockerIdAndBlockedId(requestBody.get("blockerId"), requestBody.get("blockedId")), HttpStatus.OK);
    }*/

    @MessageMapping("/block")
    public BlockDto block(BlockDto blockDto) {
        System.out.println("BLOCK!");
        if(userService.blockUserByBlockerIdAndBlockedId(blockDto.getBlockerId(), blockDto.getBlockedId())){
            System.out.println("Blocked Successfully"+ blockDto.getBlockedId());
            simpMessagingTemplate.convertAndSendToUser(
                    blockDto.getBlockedId()+"",
                    "/queue/blocked",
                    blockDto.getBlockerId()+"");
        }
        return null;

    }

    @MessageMapping("/unblock")
    public UnblockDto unblock(UnblockDto unblockDto) {
        if(userService.unblockUserByBlockerIdAndBlockedId(unblockDto.getUnblockerId(), unblockDto.getUnblockedId())){
            simpMessagingTemplate.convertAndSendToUser(
                    unblockDto.getUnblockedId()+"",
                    "/queue/unblocked",
                    unblockDto.getUnblockerId()+"");
        }
        return null;

    }






    /*@DeleteMapping("{blockerId}/unblock/{blockedId}")
    public ResponseEntity<Boolean> unblock(@PathVariable long blockedId, @PathVariable long blockerId) {
        return new ResponseEntity<>(userService.unblockUserByBlockerIdAndBlockedId(blockerId, blockedId), HttpStatus.OK);
    }
*/
    //get list of ids of the users that blocked this user ()
    @PostMapping("/get-blocker-id-list-by-blocked-id")
    @PostAuthorize("true")
    public ResponseEntity<List<Long>> getBlockerIdListByBlockedId(@RequestBody Map<String, Long> requestBody) {
        return new ResponseEntity<>(userService.getBlockerIdListByBlockedId(requestBody.get("userId")), HttpStatus.OK);
    }



    @PostMapping("/get-blocked-id-list-by-blocker-id")
    @PostAuthorize("true")
    public ResponseEntity<List<Long>> getBlockedIdListByBlockekId(@RequestBody Map<String, Long> requestBody) {
        return new ResponseEntity<>(userService.getBlockerIdListByBlockedId(requestBody.get("userId")), HttpStatus.OK);
    }

    @GetMapping("/{blockedId}/is-blocked-by/{blockerId}")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> isBlockedBy(@PathVariable long blockedId, @PathVariable long blockerId) {
        return new ResponseEntity<>(userService.isBlockedBy(blockedId, blockerId), HttpStatus.OK);
    }

}
