package com.matchup.dto;

import com.matchup.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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


}
