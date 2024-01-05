package com.matchup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetOldMessageRequestDto {
    private long user1Id;
    private long user2Id;
    private int page;
    private int size;
    private String orderBy;
    private Sort.Direction direction;
}
