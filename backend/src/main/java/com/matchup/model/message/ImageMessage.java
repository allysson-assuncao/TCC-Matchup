package com.matchup.model.message;

import com.matchup.model.User;
import com.matchup.model.image.ImageModel;
import com.matchup.model.image.MessageImage;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@DiscriminatorValue("image")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class  ImageMessage extends Message{

    @ManyToMany(mappedBy = "imageMessages")
    private List<MessageImage> hashedImage;

}
