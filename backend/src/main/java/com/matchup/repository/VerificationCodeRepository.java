package com.matchup.repository;

import com.matchup.model.User;
import com.matchup.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    VerificationCode findByUserIdAndCode(Long userId, String code);

}
