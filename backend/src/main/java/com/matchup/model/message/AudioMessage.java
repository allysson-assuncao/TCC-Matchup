package com.matchup.model.message;

import com.matchup.model.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@DiscriminatorValue("audio")
public class AudioMessage  extends Message{

    @ManyToOne
    private Audio hashedAudio;

    // <editor-fold desc="Constructors">
    public AudioMessage() {
    }

    public AudioMessage(LocalDateTime date, User sender, User receiver, boolean viewed, Audio hashedAudio) {
        super(date, sender, receiver, viewed);
        this.hashedAudio = hashedAudio;
    }
    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    public Audio getHashedAudio() {
        return hashedAudio;
    }

    public void setHashedAudio(Audio hashedAudio) {
        this.hashedAudio = hashedAudio;
    }


    // </editor-fold>=

}
