package com.matchup.controller;

import com.matchup.dto.GetProfileNotIncludedInIdsRequest;
import com.matchup.dto.ProfileDto;
import com.matchup.model.User;
import com.matchup.service.ImageService;
import com.matchup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/get/user/")
public class ProfileController {

    private final UserService userService;

    private final ImageService imageService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public ProfileController(SimpMessagingTemplate simpMessagingTemplate, UserService userService, ImageService imageService) {
        this.userService = userService;
        this.imageService = imageService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @GetMapping("by/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
        return new ResponseEntity<>(userService.findByUsername(username).get(), HttpStatus.ACCEPTED);
    }

    /*@GetMapping("profile-picture/by/id/")
    @PostAuthorize("true")
    public ResponseEntity<MultiPartFileDto> getProfilePictureById(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("width") int width, @RequestParam("height") int height) {
        return new ResponseEntity<>(imageService.getProfilePictureByUsername(userDetails.getUsername(), width, height), HttpStatus.OK);
    }*/

    @GetMapping("profile/{username}/accessed-by/{userId}")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable("userId")  long userId, @PathVariable("username")  String username) {
        return new ResponseEntity<>(userService.getProfileByUsernameAndUserId(userId, username), HttpStatus.OK);
    }

   /* @MessageMapping("/find-user")
    public void getProfileNotIncludedInIds(List<Long> ids) {
        userService.getProfileNotIncludedInIds(ids);
        *//*messageDto = messageService.sendMessage(messageDto);
        messageDto.setContactId(messageService.findContactId(messageDto.getReceiverId(), messageDto.getSenderId()));
        simpMessagingTemplate.convertAndSendToUser(
                messageDto.getReceiverId()+"", "/queue/private-messages", messageDto);
        messageDto.setContactId(messageService.findContactId(messageDto.getSenderId(), messageDto.getReceiverId()));
        simpMessagingTemplate.convertAndSendToUser(
                messageDto.getSenderId()+"", "/queue/private-messages", messageDto);*//*
    }*/

    @PostMapping("/find-user")
    public ResponseEntity<ProfileDto> getProfileNotIncludedInIds(@AuthenticationPrincipal UserDetails userDetails, @RequestBody GetProfileNotIncludedInIdsRequest getProfileNotIncludedInIdsRequest) {
        if(userDetails == null || userDetails.getUsername() == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(userService.getProfileNotIncludedInIds(userDetails.getUsername(), getProfileNotIncludedInIdsRequest.getIds()), HttpStatus.OK);
    }


/*    @PostMapping("/user")
    @PostAuthorize("true")
    public ResponseEntity<User> register(@RequestBody UserDto userDto) {
        System.out.println("register-user");
        System.out.println(userDto.getBirthDate());

        *//*if (!userService.verifyDate(userDto.getBirthDate())){
            throw new DateTimeException(userDto.getBirthDate().toString());
        }*//*

        return new ResponseEntity<>(userService.registerUser(userDto), HttpStatus.OK);
    }*/

}

