package com.matchup.model.message;

import com.matchup.model.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Arrays;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "message_type")
public abstract class  Message {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "date", nullable = false, updatable = false)
    private LocalDateTime date;



    // <editor-fold desc="Constructors">
    public Message() {

    }

    public Message(LocalDateTime date, User sender, User receiver, boolean viewed) {
        this.date = date;
        this.sender = sender;
        this.receiver = receiver;
        this.viewed = viewed;
    }
    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public long getId() {
        return id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    // </editor-fold>=

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", date=" + date +
                ", sender=" + sender +
                ", receiver=" + receiver +
                ", status='" + viewed + '\'' +
                '}';
    }
}
