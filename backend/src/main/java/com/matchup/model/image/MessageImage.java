package com.matchup.model.image;

import com.matchup.model.message.ImageMessage;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@DiscriminatorValue("message_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageImage extends ImageModel {
    @ManyToMany
    @JoinColumn(name = "message_image_id")
    private List<ImageMessage> imageMessages;

}