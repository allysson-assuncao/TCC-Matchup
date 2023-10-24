package com.matchup.model.message;

import com.matchup.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Arrays;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "message_type")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public abstract class  Message {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "date", nullable = false, updatable = false)
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "sender", nullable = false, updatable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver", nullable = false, updatable = false)
    private User receiver;

    @Column(name = "viewed", nullable = false)
    private boolean viewed;
}
