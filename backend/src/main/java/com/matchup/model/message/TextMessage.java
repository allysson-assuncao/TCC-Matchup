package com.matchup.model.message;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("text")
public abstract class  TextMessage extends Message{

    @ManyToOne
    private Text hashedText;


    // <editor-fold desc="Constructors">



    // </editor-fold>

    // <editor-fold desc="Encapsulation">



    // </editor-fold>=
}
