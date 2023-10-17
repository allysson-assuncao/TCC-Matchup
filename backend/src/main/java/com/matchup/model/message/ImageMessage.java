package com.matchup.model.message;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("image")
public abstract class  ImageMessage extends Message{

    @ManyToMany
    private Image hashedimage;

    // <editor-fold desc="Constructors">



    // </editor-fold>

    // <editor-fold desc="Encapsulation">



    // </editor-fold>=
}
