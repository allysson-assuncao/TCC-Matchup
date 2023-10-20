package com.matchup.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contact", schema = "matchup")
public class Contact {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private User user1;

    @ManyToOne
    private User user2;

    private boolean displayed;

    // <editor-fold desc="Constructors">
    public Contact() {
    }

    public Contact(User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    public Contact(User user1, User user2, boolean displayed) {
        this.user1 = user1;
        this.user2 = user2;
        this.displayed = displayed;
    }
    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public boolean isDisplayed() {
        return displayed;
    }

    public void setDisplayed(boolean displayed) {
        this.displayed = displayed;
    }
    // </editor-fold>

}
