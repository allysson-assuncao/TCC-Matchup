package com.matchup.controller;

import com.matchup.dto.UserDto;
import com.matchup.model.Interest;
import com.matchup.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.support.NullValue;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;
import com.matchup.service.UserService;

import javax.lang.model.util.Elements;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/login")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    /*@GetMapping("/teste")
    public ResponseEntity<User> teste() {
        return new ResponseEntity<>(userService.saveUser(), HttpStatus.ACCEPTED);
    }*/

    @GetMapping("/teste2/{userId}")
    public ResponseEntity<Optional<User>> teste2(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>(userService.findById(Long.valueOf(userId)), HttpStatus.ACCEPTED);
    }

    @GetMapping("/teste3/{partOfTheName}")
    public ResponseEntity<List<User>> teste3(@PathVariable("partOfTheName") String partOfTheName) {
        return new ResponseEntity<>(userService.findByPartOfTheName(partOfTheName), HttpStatus.ACCEPTED);
    }

    @PostMapping("/")
    public ResponseEntity<User> login(@RequestBody UserDto userDto) {
        System.out.println(userDto.getEmail());
        System.out.println(userDto.getRawPassword());
        Optional<User> user = userService.findByEmailAndHashedPassword(userDto);
        if (user.isEmpty()){
            throw new NullPointerException();
        }
        return new ResponseEntity<>(user.get(), HttpStatus.ACCEPTED);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody String email) {
        System.out.println("forgot-password");
        return new ResponseEntity<>(userService.sendCode(email), HttpStatus.ACCEPTED);
    }

    //copied to RegisterController
    /*@PostMapping("/teste4")
    @PostAuthorize("true")
    public ResponseEntity<User> register(@RequestBody User user) {
        System.out.println(user.getName());
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
    }*/

    @GetMapping("/teste5")
    public ResponseEntity<List<User>> teste5() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.ACCEPTED);
    }

    @PostMapping("/reset-password/{password}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Boolean> resetPassword(@RequestBody String password) {
        //send confirmation to the user's email
        return new ResponseEntity<>(userService.resetPassword(password), HttpStatus.ACCEPTED);
    }

    @PostMapping("/login-route")
    public ResponseEntity<String> receiveFormData(@RequestBody User user){
        return ResponseEntity.ok("Data received successfully!");
    }

}
