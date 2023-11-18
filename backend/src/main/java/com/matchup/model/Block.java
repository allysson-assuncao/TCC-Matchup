package com.matchup.model;

import com.matchup.model.user.User;
import jakarta.persistence.*;

@Entity
@Table(name = "block", schema = "matchup")
public class Block {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User blocker;

    @ManyToOne
    private User blocked;

    // <editor-fold desc="Constructors">
    public Block() {
    }

    public Block(User blocker, User blocked) {
        this.blocker = blocker;
        this.blocked = blocked;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getBlocker() {
        return blocker;
    }

    public void setBlocker(User blocker) {
        this.blocker = blocker;
    }

    public User getBlocked() {
        return blocked;
    }

    public void setBlocked(User blocked) {
        this.blocked = blocked;
    }

    // </editor-fold>

}
