package com.matchup.controller;

import com.matchup.dto.UserDto;
import com.matchup.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.matchup.service.UserService;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/login")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    public ResponseEntity<User> login(@RequestBody UserDto userDto) {
        Optional<User> user = userService.findByEmailAndHashedPassword(userDto);
        if (user.isEmpty()){
            throw new NullPointerException();
        }
        return new ResponseEntity<>(user.get(), HttpStatus.ACCEPTED);
    }

    @PostMapping("/login-route")
    public ResponseEntity<String> receiveFormData(@RequestBody User user){
        return ResponseEntity.ok("Data received successfully!");
    }

}
