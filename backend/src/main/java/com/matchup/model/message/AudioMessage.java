package com.matchup.model.message;

import com.matchup.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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
