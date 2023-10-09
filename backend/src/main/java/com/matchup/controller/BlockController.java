package com.matchup.controller;

import com.matchup.dto.UserDto;
import com.matchup.model.User;
import com.matchup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/")
public class BlockController {

    private final UserService userService;

    @Autowired
    public BlockController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/user")
    @PostAuthorize("true")
    public ResponseEntity<User> update(@ModelAttribute UserDto userDto) {
        System.out.println("editing user");
        return new ResponseEntity<>(userService.updateUser(userDto), HttpStatus.OK);
    }

    /*@PostMapping("/block")
    @PostAuthorize("true")
    public ResponseEntity<Boolean> solicitationResponse(@RequestBody Map<String, Long> requestBody ) {
        return new ResponseEntity<Boolean>(userService.blockUserByBlockerIdAndBlockedId(requestBody.get("blockerId")) requestBody.get("blockerId")) Boolean.parseBoolean(accepted)), HttpStatus.OK);
    }*/

}
