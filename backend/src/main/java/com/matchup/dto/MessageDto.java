package com.matchup.dto;

import com.matchup.enums.MessageType;
import com.matchup.model.image.MessageImage;
import jakarta.mail.Multipart;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public class MessageDto {

    long id;

    private LocalDateTime date;

    private long senderId;

    private long receiverId;

    private MessageType messageType;

    private boolean viewed;

    private List<MultipartFile> hashedImage;

    private String hashedAudio;

    private String hashedText;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public long getSenderId() {
        return senderId;
    }

    public void setSenderId(long senderId) {
        this.senderId = senderId;
    }

    public long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(long receiverId) {
        this.receiverId = receiverId;
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    public boolean isViewed() {
        return viewed;
    }

    public void setViewed(boolean viewed) {
        this.viewed = viewed;
    }

    public List<MultipartFile> getHashedImage() {
        return hashedImage;
    }

    public void setHashedImage(List<MultipartFile> hashedImage) {
        this.hashedImage = hashedImage;
    }

    public String getHashedAudio() {
        return hashedAudio;
    }

    public void setHashedAudio(String hashedAudio) {
        this.hashedAudio = hashedAudio;
    }

    public String getHashedText() {
        return hashedText;
    }

    public void setHashedText(String hashedText) {
        this.hashedText = hashedText;
    }
}
