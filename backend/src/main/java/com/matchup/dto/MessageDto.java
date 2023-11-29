package com.matchup.dto;

import com.matchup.enums.MessageType;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MessageDto {
    long id;

    private String receiverUsername;

    private LocalDateTime date;

    private long senderId;

    private long receiverId;

    private MessageType messageType;

    private boolean viewed;

    /*private List<MultipartFile> hashedImage;*/

    private List<byte[]> hashedImage;

    private String hashedAudio;

    private String hashedText;
}
