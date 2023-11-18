package com.matchup.controller;

import com.matchup.dto.UserDto;
import com.matchup.model.User;
import com.matchup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/update")
public class EditUserDataController {

    private final UserService userService;

    @Autowired
    public EditUserDataController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/user")
    @PostAuthorize("true")
    public ResponseEntity<User> update(@ModelAttribute UserDto userDto) {
        System.out.println("editing user");
        return new ResponseEntity<>(userService.updateUser(userDto), HttpStatus.OK);
    }


//    @PostMapping("/user")
//    @PostAuthorize("true")
//    public ResponseEntity<User> register(@RequestBody UserDto userDto) {
//        System.out.println("register-user");
//        System.out.println(userDto.getBirthDate());
//
//        /*if (!userService.verifyDate(userDto.getBirthDate())){
//            throw new DateTimeException(userDto.getBirthDate().toString());
//        }*/
//
//        return new ResponseEntity<>(userService.registerUser(userDto), HttpStatus.OK);
//    }

}

