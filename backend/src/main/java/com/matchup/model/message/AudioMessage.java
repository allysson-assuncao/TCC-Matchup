package com.matchup.model.message;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("audio")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AudioMessage  extends Message{

    @ManyToOne
    private Audio hashedAudio;

}
