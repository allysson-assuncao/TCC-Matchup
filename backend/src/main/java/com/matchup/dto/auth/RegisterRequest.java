package com.matchup.dto.auth;


import com.matchup.enums.UserAccess;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String name;
    private String email;
    private LocalDate birthDate;
    @Pattern(regexp = "^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$")
    private String rawPassword;

    private int addressNumber;
    private String addressStreet;
    private String addressNeighborhood;
    private String addressCity;
    private String addressState;
    private String addressZipcode;
}
