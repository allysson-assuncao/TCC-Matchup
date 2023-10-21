package com.matchup.model.message;

import com.matchup.model.User;
import com.matchup.model.image.ImageModel;
import com.matchup.model.image.MessageImage;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@DiscriminatorValue("image")
public class  ImageMessage extends Message{

    @ManyToMany(mappedBy = "imageMessages")
    private List<MessageImage> hashedImage;

    // <editor-fold desc="Constructors">
    public ImageMessage() {
    }

    public ImageMessage(LocalDateTime date, User sender, User receiver, boolean viewed, List<MessageImage> hashedImage) {
        super(date, sender, receiver, viewed);
        this.hashedImage = hashedImage;
    }
    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public List<MessageImage> getHashedImage() {
        return hashedImage;
    }

    public void setHashedImage(List<MessageImage> hashedImage) {
        this.hashedImage = hashedImage;
    }
    // </editor-fold>=
}
