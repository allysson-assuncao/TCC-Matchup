package com.matchup.controller;

import com.matchup.model.User;
import com.matchup.service.EmailService;
import com.matchup.service.UserService;
import com.matchup.service.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/forgot-password")
@CrossOrigin(origins = "*")
public class ForgotPasswordController {

    @Autowired
    private final UserService userService;

    @Autowired
    private final VerificationCodeService verificationCodeService;

    @Autowired
    public ForgotPasswordController(UserService userService, VerificationCodeService verificationCodeService, EmailService emailService) {
        this.userService = userService;
        this.verificationCodeService = verificationCodeService;
    }

    @PostMapping("/confirm-email")
    public ResponseEntity<Long> forgotPassword(@RequestBody String email) {
        System.out.println("forgot-password");
        return new ResponseEntity<>(verificationCodeService.sendCode(email), HttpStatus.ACCEPTED);
    }

    @PostMapping("/verify-code/{code}/{userId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Boolean> verifyCode(@PathVariable String code, @PathVariable Long userId) {
        System.out.println("verifyCode");
        User user = userService.findById(userId).get();
        return new ResponseEntity<>(verificationCodeService.verifyCode(code, user), HttpStatus.ACCEPTED);
    }

    @PostMapping("/reset-password/{id}/{rawPassword}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Boolean> resetPassword(@RequestBody Long id, @RequestBody String rawPassword) {
        //send email to confirm
        /*if (userService.resetPassword(id, rawPassword)) {
            String to = email;
            String subject = "Senha Redefinida com Sucesso!";
            String text = "Faça login na sua conta para testar sua nova senha!!";
            emailService.sendEmail(to, subject, text);
        }*/
        return ResponseEntity.status(HttpStatus.CONFLICT).body(userService.resetPassword(id, rawPassword));
    }

}
