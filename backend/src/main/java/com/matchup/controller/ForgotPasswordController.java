package com.matchup.controller;

import com.matchup.dto.ResetPasswordDto;
import com.matchup.model.User;
import com.matchup.service.EmailService;
import com.matchup.service.UserService;
import com.matchup.service.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Long> forgotPassword(@RequestParam String email) {
        return new ResponseEntity<>(verificationCodeService.sendCode(email), HttpStatus.ACCEPTED);
    }

    @PostMapping("/verify-code/{code}/{userId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Boolean> verifyCode(@PathVariable String code, @PathVariable long userId) {
        System.out.println("verifyCode" + code + " userId: " + userId);
        User user = userService.findById(userId).get();
        if(verificationCodeService.verifyCode(code, userId)){
            System.out.println("FOOOOOOOOOOOOOOOI!!!");
        }
        return new ResponseEntity<>(verificationCodeService.verifyCode(code, userId), HttpStatus.ACCEPTED);
    }

    @PutMapping("/reset-password")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Boolean> resetPassword(@RequestBody ResetPasswordDto resetPasswordDto) {
        System.out.println("reset-password: " + resetPasswordDto.getId() + " userId: " + resetPasswordDto.getRawPassword());
        if(userService.updateUserPassword(resetPasswordDto.getId(), resetPasswordDto.getRawPassword()) != null){
            return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<>(false, HttpStatus.CONFLICT);
        }
    }

}
