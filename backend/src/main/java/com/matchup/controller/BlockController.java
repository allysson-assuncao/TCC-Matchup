package com.matchup.controller;

import com.matchup.dto.UserDto;
import com.matchup.model.User;
import com.matchup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/")
public class BlockController {

    private final UserService userService;

    @Autowired
    public BlockController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/block")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> block(@RequestBody Map<String, Long> requestBody) {
        return new ResponseEntity<>(userService.blockUserByBlockerIdAndBlockedId(requestBody.get("blockerId"), requestBody.get("blockedId")), HttpStatus.OK);
    }

    @PostMapping("/unblock")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> unblock(@RequestBody Map<String, Long> requestBody ) {
        return new ResponseEntity<>(userService.unblockUserByBlockerIdAndBlockedId(requestBody.get("blockerId"), requestBody.get("blockedId")), HttpStatus.OK);
    }

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
