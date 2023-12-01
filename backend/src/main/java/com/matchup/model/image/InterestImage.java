package com.matchup.model.image;

import com.matchup.model.Interest;
import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("interest_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InterestImage extends ImageModel {
    @ManyToOne
    @JoinColumn(name = "interest_id")
    private Interest interest;

}

