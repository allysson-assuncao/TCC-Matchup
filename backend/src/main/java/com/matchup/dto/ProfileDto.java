package com.matchup.dto;

import com.matchup.enums.FriendshipStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private long id;
    private String profilePicture;
    private String username;
    private String name;
    private String bio;
    private boolean isBlockedByMe;
    private boolean blockedMe;
    private boolean doesFriendshipExist;
    private String friendshipStatus;
    private List<String> interestNames;
}
