package com.matchup.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Arrays;

@Entity
@Table(name = "Message", schema = "matchup")
public class Message {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "hashed_content", nullable = false, length = 1023)
    private byte[] hashedContent;

    @Column(name = "date", nullable = false, updatable = false)
    private LocalDateTime date;

    @Column(name = "extension", nullable = false, length = 5)
    private String extension;

    @ManyToOne
    @JoinColumn(name = "sender", nullable = false, updatable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver", nullable = false, updatable = false)
    private User receiver;

    @Column(name = "status", nullable = false)
    private String status;


    // <editor-fold desc="Constructors">
    public Message() {

    }

    public Message(byte[] hashedContent, LocalDateTime date, String extension, User sender, User receiver, String statusViewed) {
        this.hashedContent = hashedContent;
        this.date = date;
        this.extension = extension;
        this.sender = sender;
        this.receiver = receiver;
        this.status = statusViewed;
    }
    // </editor-fold>

    // <editor-fold desc="Encapsulation">
    public long getId() {
        return id;
    }

    public byte[] getHashedContent() {
        return hashedContent;
    }

    public void setHashedContent(byte[] hashedContent) {
        this.hashedContent = hashedContent;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
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

    public String getStatus() {
        return status;
    }

    // </editor-fold>


    public void setStatusPending() {
        this.status = "PENDING";
    }

    public void setStatusSent() {
        this.status = "SENT";
    }

    public void setStatusReceived() {
        this.status = "RECEIVED";
    }

    public void setStatusViewed() {
        this.status = "VIEWED";
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", hashedContent=" + Arrays.toString(hashedContent) +
                ", date=" + date +
                ", extension='" + extension + '\'' +
                ", sender=" + sender +
                ", receiver=" + receiver +
                ", status='" + status + '\'' +
                '}';
    }
}
