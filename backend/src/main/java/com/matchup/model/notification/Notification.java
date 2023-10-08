package com.matchup.model.notification;

import com.matchup.model.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "notification_type")
public abstract class Notification {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date", nullable = false, updatable = false)
    private LocalDateTime date;

    @Column(name = "status", nullable = false)
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // <editor-fold desc="Constructors">

    public Notification() {
    }

    public Notification(LocalDateTime date, boolean status, User user) {
        this.date = date;
        this.status = status;
        this.user = user;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // </editor-fold>

}