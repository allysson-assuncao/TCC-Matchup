package com.matchup.model.message;

import com.matchup.model.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "audio", schema = "matchup")
public class  Audio {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "hashed_audio", nullable = false, updatable = false)
    private byte[] hashedAudio;

    @OneToMany(mappedBy = "hashedAudio")
    private List<AudioMessage> audioMessages;
    
    // <editor-fold desc="Constructors">

    public Audio() {
    }

    public Audio(byte[] hashedAudio) {
        this.hashedAudio = hashedAudio;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    public long getId() {
        return id;
    }

    public byte[] getHashedAudio() {
        return hashedAudio;
    }

    public void setHashedAudio(byte[] hashedAudio) {
        this.hashedAudio = hashedAudio;
    }


    // </editor-fold>=


}

