package com.matchup.service;

import com.matchup.model.User;
import com.matchup.model.VerificationCode;
import com.matchup.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class VerificationCodeService {

    private final VerificationCodeRepository verificationCodeRepository;

    @Autowired
    public VerificationCodeService(VerificationCodeRepository verificationCodeRepository) {
        this.verificationCodeRepository = verificationCodeRepository;
    }

    public void deleteExpiredVerificationCodes() {
        List<VerificationCode> allCodes = verificationCodeRepository.findAll();
        for (VerificationCode code : allCodes) {
            if (code.getExpirationDate().isBefore(LocalDate.now())) {
                verificationCodeRepository.delete(code);
            }
        }
    }

    public String verifyCode(User user, String code) {
        deleteExpiredVerificationCodes();
        VerificationCode verificationCode = verificationCodeRepository.findByUserAndCode(user, code);
        if(verificationCode == null) return "Código inválido";
        return null;
    }

}

