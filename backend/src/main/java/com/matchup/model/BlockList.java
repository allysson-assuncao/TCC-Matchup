package com.matchup.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "block_list", schema = "matchup")
public class BlockList {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "blocker")
    private User blocker;

    @OneToMany
    @JoinColumn(name = "blocked_users_id")
    private List<User> blockedUsers;

    // <editor-fold desc="Constructors">

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    // </editor-fold>

}

