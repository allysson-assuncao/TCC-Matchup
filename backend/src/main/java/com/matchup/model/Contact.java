package com.matchup.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "contact", schema = "matchup")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Contact {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User user1;

    @ManyToOne
    private User user2;

    private boolean displayed;
}
