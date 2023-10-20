package com.matchup.model.image;

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
    public MessageImage() {
    }

    public MessageImage(String name, String originalName, byte[] content, String contentType, List<ImageMessage> imageMessages) {
        super(name, originalName, content, contentType);
        this.imageMessages = imageMessages;
    }
    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public List<ImageMessage> getImageMessages() {
        return imageMessages;
    }

    public void setImageMessages(List<ImageMessage> imageMessages) {
        this.imageMessages = imageMessages;
    }
    // </editor-fold>

}