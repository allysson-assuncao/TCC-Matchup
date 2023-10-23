package com.matchup.dto;

import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ContactDto {
    private long id;

    private long user1Id;

    private long user2Id;

    private String user2Username;

    private boolean displayed;

    private List<MessageDto> messages;
}
