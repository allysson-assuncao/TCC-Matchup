package com.matchup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "notification", schema = "matchup")
public class Notification {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "sender_id", nullable = false)
    private User sender;

    private Notificatable objNotificatable;

    @Column(name = "receiver_id", nullable = false)
    private User receiver;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @JsonIgnore
    @OneToOne(mappedBy = "user")
    private ProfilePicture profilePicture;

    @Column(name = "bio", length = 2000, updatable = true)
    private String bio;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToMany(mappedBy = "user")
    private List<Friendship> friends;

    @ManyToMany
    private List<Interest> interests;

    @OneToMany(mappedBy = "sender")
    private List<Message> sentMessages = new ArrayList<>();

    @OneToMany(mappedBy = "receiver")
    private List<Message> receivedMessages;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<VerificationCode> codes;

    // <editor-fold desc="Constructors">

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    // </editor-fold>

}

