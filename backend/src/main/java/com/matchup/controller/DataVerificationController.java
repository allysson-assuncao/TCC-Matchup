package com.matchup.controller;

import com.matchup.exceptions.InvalidCodeException;
import com.matchup.exceptions.InvalidPasswordException;
import com.matchup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/data-verification")
@CrossOrigin(origins = "*")
public class DataVerificationController {
    private final UserService userService;

    @Autowired
    public DataVerificationController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/email/check-availability/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email) {
        if (userService.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado!");
        }
        return ResponseEntity.ok("Email disponível");
    }

    @GetMapping("/username/check-availability/{username}")
    public ResponseEntity<String> verifyUsername(@PathVariable String username) {
        if (userService.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Nome de usuário já cadastrado!");
        }
        return ResponseEntity.ok("Nome de usuário disponível");
    }

    @GetMapping("/email/exists/{email}")
    public ResponseEntity<String> verifyEmailNotRegistered(@PathVariable String email) {
        if (!userService.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email não está em uso!");
        }
        return ResponseEntity.ok("Há um usuário cadastrado com esse email");
    }

    @GetMapping("/username/exists/{username}")
    public ResponseEntity<String> verifyUsernameNotRegistered(@PathVariable String username) {
        if (!userService.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Nome de usuário não está em uso!");
        }
        return ResponseEntity.ok("Há um usuário cadastrado com esse nome de usuário");
    }

    @GetMapping("/password/check-pattern/{password}")
    public ResponseEntity<String> verifyPassword(@PathVariable String password) throws InvalidPasswordException {
        if (!userService.verifyPassword(password)) {
            throw new InvalidPasswordException();
        }
        return ResponseEntity.ok("Password is valid!");
    }

    /*@GetMapping("/{emailOrUsername}")
    public ResponseEntity<Boolean> verifyEmailOrUsername(@PathVariable String emailOrUsername) {
        return new ResponseEntity<>(userService.existsByEmailOrUsername(emailOrUsername, emailOrUsername), HttpStatus.ACCEPTED);
    }*/

    @GetMapping("/{date}")
    public ResponseEntity<Boolean> verifyDate(@PathVariable LocalDate date) {
        return new ResponseEntity<>(userService.verifyDate(date), HttpStatus.ACCEPTED);
    }

    @PostMapping("/code")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Boolean> confirmEmailByCode(@RequestBody String inputCode) throws InvalidCodeException {
        System.out.println("confirmCode");
        return new ResponseEntity<>(userService.verifyCode(inputCode), HttpStatus.ACCEPTED);
    }

}
