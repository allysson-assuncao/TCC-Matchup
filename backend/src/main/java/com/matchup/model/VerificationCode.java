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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @Column(name = "user_id")
    private Long userId;

    // <editor-fold desc="Constructors">

    public VerificationCode() {}

    public VerificationCode(String code, LocalDateTime expirationDate, User user, Long userId) {
        this.code = code;
        this.expirationDate = expirationDate;
        this.user = user;
        this.userId = userId;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // </editor-fold>

}
