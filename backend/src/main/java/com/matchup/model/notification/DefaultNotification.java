package com.matchup.model.notification;

import com.matchup.model.Friendship;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@DiscriminatorValue("default_notification")
public class DefaultNotification extends Notification {
    private String content;

    // <editor-fold desc="Constructors">

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    // </editor-fold>

}
