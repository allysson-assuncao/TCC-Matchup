package com.matchup.model.image;

import com.matchup.model.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("profile_picture")
public class ProfilePicture extends ImageModel {
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // <editor-fold desc="Constructors">

    public ProfilePicture() {
    }

    public ProfilePicture(User user) {
        this.user = user;
    }

    public ProfilePicture(String name, String originalName, byte[] content, String contentType, User user) {
        super(name, originalName, content, contentType);
        this.user = user;
    }


    // </editor-fold>


    // <editor-fold desc="Encapsulation">

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    // </editor-fold>

}