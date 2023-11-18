package com.matchup.model.message;

import jakarta.persistence.*;
import lombok.*;

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
