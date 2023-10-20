package com.matchup.model.message;

import com.matchup.model.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("text")
public abstract class  TextMessage extends Message{

    @ManyToOne
    private Text hashedText;

    // <editor-fold desc="Constructors">
    public TextMessage() {
    }

    public TextMessage(LocalDateTime date, User sender, User receiver, boolean viewed, Text hashedText) {
        super(date, sender, receiver, viewed);
        this.hashedText = hashedText;
    }
    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public Text getHashedText() {
        return hashedText;
    }

    public void setHashedText(Text hashedText) {
        this.hashedText = hashedText;
    }
    // </editor-fold>=

}
