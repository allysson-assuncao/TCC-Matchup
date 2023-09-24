package com.matchup.repository;

import com.matchup.model.User;
import com.matchup.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    VerificationCode findByUserAndCode(User user, String code);

}

