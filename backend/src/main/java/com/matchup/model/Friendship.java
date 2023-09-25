package com.matchup.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "friendships", schema = "matchup")
public class Friendship {
    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "status", nullable = false, updatable = true)
    private String status;

    @Column(name = "date", nullable = false, updatable = false)
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "friend_id", nullable = false, updatable = false)
    private User friend;

    // <editor-fold desc="Constructors">
    public Friendship() {

    }

    public Friendship(String status, LocalDateTime date, User user, User friend) {
        this.status = status;
        this.date = date;
        this.user = user;
        this.friend = friend;
    }
    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getFriend() {
        return friend;
    }

    public void setFriend(User friend) {
        this.friend = friend;
    }
    // </editor-fold>

    public void accept(){
        this.status = "ACCEPTED";
    }

    public void refuse(){
        this.status = "REFUSED";
    }

    public void block(){
        this.status = "BLOCKED";
    }

    @Override
    public String toString() {
        return "Friendship{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", date=" + date +
                ", user=" + user +
                ", friend=" + friend +
                '}';
    }
}
