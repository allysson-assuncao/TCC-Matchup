package com.matchup.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class VerificationCode {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false, updatable = false)
    private String code;

    @Column(name = "expiration_date", nullable = false, updatable = false)
    private LocalDate expirationDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    // <editor-fold desc="Constructors">

    public VerificationCode() {}

    public VerificationCode(String code, LocalDate expirationDate, User user) {
        this.code = code;
        this.expirationDate = expirationDate;
        this.user = user;
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

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    // </editor-fold>

}

