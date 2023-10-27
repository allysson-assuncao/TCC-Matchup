package com.matchup.model.message;

import com.matchup.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("text")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class  TextMessage extends Message{

    @Column(name = "hashed_text", nullable = false, updatable = true)
    private String hashedText;

    @Column(name = "edited", nullable = false, updatable = true)
    private boolean edited;

}
