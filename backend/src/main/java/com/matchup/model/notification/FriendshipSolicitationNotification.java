package com.matchup.model.notification;

import com.matchup.model.Friendship;
import com.matchup.model.User;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("friendship")
public class FriendshipSolicitationNotification extends Notification {
    @ManyToOne
    @JoinColumn(name = "friendship_id")
    private Friendship friendship;

    // <editor-fold desc="Constructors">

    public FriendshipSolicitationNotification() {
    }

    public FriendshipSolicitationNotification(Friendship friendship) {
        this.friendship = friendship;
    }

    public FriendshipSolicitationNotification(LocalDateTime date, boolean status, User user, Friendship friendship) {
        super(date, status, user);
        this.friendship = friendship;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    public Friendship getFriendship() {
        return friendship;
    }

    public void setFriendship(Friendship friendship) {
        this.friendship = friendship;
    }

    // </editor-fold>

}
