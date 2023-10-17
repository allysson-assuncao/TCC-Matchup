package com.matchup.model.image;

import com.matchup.model.User;
import com.matchup.model.message.ImageMessage;
import jakarta.persistence.*;

import java.util.List;

@Entity
@DiscriminatorValue("message_image")
public class MessageImage extends ImageModel {
    @ManyToMany
    @JoinColumn(name = "message_image_id")
    private List<ImageMessage> imageMessages;

    // <editor-fold desc="Constructors">

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    // </editor-fold>

}