package com.matchup.model.message;

import com.matchup.model.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("text")
public class  TextMessage extends Message{

    @Column(name = "hashed_text", nullable = false, updatable = true)
    private String hashedText;

    @Column(name = "edited", nullable = false, updatable = true)
    private boolean edited;

    // <editor-fold desc="Constructors">
    public TextMessage() {
    }

    public TextMessage(LocalDateTime date, User sender, User receiver, boolean viewed, String hashedText) {
        super(date, sender, receiver, viewed);
        this.hashedText = hashedText;
    }
    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public String getHashedText() {
        return hashedText;
    }

    public void setHashedText(String hashedText) {
        this.hashedText = hashedText;
    }
    // </editor-fold>=

}
