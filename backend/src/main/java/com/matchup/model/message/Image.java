package com.matchup.model.message;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "image", schema = "matchup")
public class Image {
    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "hashed_text", nullable = false, updatable = false)
    private String hashedText;

    @Column(name = "edited", nullable = false, updatable = true)
    private boolean edited;

    @OneToMany
    private List<TextMessage> textMessages;

    // <editor-fold desc="Constructors">



    // </editor-fold>

    // <editor-fold desc="Encapsulation">



    // </editor-fold>

}

