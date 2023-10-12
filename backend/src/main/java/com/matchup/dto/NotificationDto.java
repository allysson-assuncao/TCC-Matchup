package com.matchup.dto;

import com.matchup.enums.NotificationType;

import java.time.LocalDateTime;



public class NotificationDto {
    private long id;
    private NotificationType type;

    private long senderId;

    private String senderUsername;
    private long receiverId;
    private LocalDateTime date;
    private long friendshipId;
    private String content;

    private boolean viewed;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
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

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public long getFriendshipId() {
        return friendshipId;
    }

    public void setFriendshipId(long friendshipId) {
        this.friendshipId = friendshipId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isViewed() {
        return viewed;
    }

    public void setViewed(boolean viewed) {
        this.viewed = viewed;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }
}
