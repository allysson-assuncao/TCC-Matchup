package com.matchup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessagePageDto {
    private List<MessageDto> messageList;
    private long contactId;
    private int page;
    private int size;
    private int totalPages;
    private int totalElements;
}
