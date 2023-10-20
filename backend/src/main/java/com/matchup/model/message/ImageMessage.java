package com.matchup.model.message;

import com.matchup.model.User;
import com.matchup.model.image.ImageModel;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@DiscriminatorValue("image")
public abstract class  ImageMessage extends Message{

    @ManyToMany(mappedBy = "imageMessages")
    private List<MessageImage> hashedImage;

    // <editor-fold desc="Constructors">

    public ImageMessage() {
    }

    public ImageMessage(LocalDateTime date, User sender, User receiver, boolean viewed, List<ImageModel> hashedImage) {
        super(date, sender, receiver, viewed);
        this.hashedImage = hashedImage;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    public List<ImageModel> getHashedImage() {
        return hashedImage;
    }

    public void setHashedImage(List<ImageModel> hashedImage) {
        this.hashedImage = hashedImage;
    }


    // </editor-fold>=
}
