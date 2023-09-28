package com.matchup.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class VerificationCode {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false, updatable = false)
    private String code;

    @Column(name = "expiration_date", nullable = false, updatable = false)
    private LocalDateTime expirationDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User userId;

    // <editor-fold desc="Constructors">

    public VerificationCode() {}

    public VerificationCode(String code, LocalDateTime expirationDate, User userId) {
        this.code = code;
        this.expirationDate = expirationDate;
        this.userId = userId;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    public Long getId() {
        return id;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User user) {
        this.userId = user;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String verificationCode) {
        this.code = verificationCode;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    // </editor-fold>

}
