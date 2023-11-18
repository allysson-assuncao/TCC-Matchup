package com.matchup.service;

import com.matchup.model.user.User;
import com.matchup.model.VerificationCode;
import com.matchup.repository.user.UserRepository;
import com.matchup.repository.VerificationCodeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class VerificationCodeService {

    public static final int CODE_EXPIRATION_TIME = 5;

    public static final String EMAIL_TITLE = "Solicitação de Redefinição de Senha";;

    @Autowired
    private final VerificationCodeRepository verificationCodeRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final EmailService emailService;

    @Autowired
    public VerificationCodeService(VerificationCodeRepository verificationCodeRepository, UserRepository userRepository, EmailService emailService) {
        this.verificationCodeRepository = verificationCodeRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public void deleteExpiredVerificationCodes() {
        List<VerificationCode> allCodes = verificationCodeRepository.findAll();
        for (VerificationCode code : allCodes) {
            if (code.getExpirationDate().isBefore(LocalDateTime.now())) {
                verificationCodeRepository.delete(code);
            }
        }
    }

    @Transactional
    public Long sendCode(String email){
        User user;
        Long id;
        if (userRepository.existsByEmail(email)){
            user = userRepository.findByEmail(email).get();
            id = user.getId();

            Random random = new Random();
            String code = String.format("%06d", random.nextInt(1000000));

            LocalDateTime expirationDate = LocalDateTime.now().plusMinutes(CODE_EXPIRATION_TIME);
            VerificationCode newCode = new VerificationCode(code, expirationDate);
            newCode = verificationCodeRepository.save(newCode);
            User userCode = userRepository.findById(id).get();
            newCode.setUser(userCode);
            userCode.getCodes().add(newCode);
            userRepository.save(userCode);
            verificationCodeRepository.save(newCode);

            emailService.sendEmail(email, EMAIL_TITLE, code);

            return id;
        }else{
            return null;
        }
    }

    public Boolean verifyCode(String code, Long userId) {
        deleteExpiredVerificationCodes();
        return verificationCodeRepository.existsByUserIdAndCode(userId, code);
       // return verificationCode != null;
    }

}
