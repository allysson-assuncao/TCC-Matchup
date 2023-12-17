package com.matchup.controller;

import com.matchup.dto.MultiPartFileDto;
import com.matchup.model.User;
import com.matchup.service.ImageService;
import com.matchup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/get/user/")
public class ProfileController {

    private final UserService userService;

    private final ImageService imageService;

    @Autowired
    public ProfileController(UserService userService, ImageService imageService) {
        this.userService = userService;
        this.imageService = imageService;
    }

    @GetMapping("by/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
        return new ResponseEntity<>(userService.findByUsername(username).get(), HttpStatus.ACCEPTED);
    }

    @GetMapping("profile-picture/by/id/")
    @PostAuthorize("true")
    public ResponseEntity<MultiPartFileDto> getProfilePictureById(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("width") int width, @RequestParam("height") int height) {
        return new ResponseEntity<>(imageService.getProfilePictureByUsername(userDetails.getUsername(), width, height), HttpStatus.OK);
    }

    @GetMapping("profile/{username}/accessed-by/{userId}")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable("userId")  long userId, @PathVariable("username")  String username) {
        return new ResponseEntity<>(userService.getProfileByUsernameAndUserId(userId, username), HttpStatus.OK);
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

