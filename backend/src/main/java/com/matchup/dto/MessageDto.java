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
@Builder
@Data
public class MessageDto {
    long id;

    private LocalDateTime date;

    private long contactIdWhereTheReceiverIsTheUser1;

    private long senderId;

    private long receiverId;

    private String messageType;

    private boolean viewed;

    /*private List<MultipartFile> hashedImage;*/

    private List<byte[]> hashedImage;

    private String hashedAudio;

    private String hashedText;
}
