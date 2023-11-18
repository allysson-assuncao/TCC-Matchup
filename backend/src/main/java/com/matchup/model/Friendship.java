package com.matchup.model;

import com.matchup.enums.FriendshipStatus;
import com.matchup.model.user.User;
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
    @Enumerated(EnumType.STRING)
    private FriendshipStatus status;

    @Column(name = "date", nullable = true)
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "friend_id", nullable = false)
    private User friend;

    // <editor-fold desc="Constructors">
    public Friendship() {

    }

    public Friendship(FriendshipStatus status, LocalDateTime date, User user, User friend) {
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

    public FriendshipStatus getStatus() {
        return status;
    }

    public void setStatus(FriendshipStatus status) {
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
