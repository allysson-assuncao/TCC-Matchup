package com.matchup.model.image;

import com.matchup.model.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("profile_picture")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProfilePicture extends ImageModel {
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}