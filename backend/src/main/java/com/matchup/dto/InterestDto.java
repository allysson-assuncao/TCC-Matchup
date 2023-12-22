package com.matchup.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterestDto {
    private long id;
    private String name;
    private String description;
    private Long companyId;
    private double lowestPrice;
    private double highestPrice;
    private Long ageRatingId;
    private List<Long> usersIdList;
    private List<Long> platformsIdList;
    private List<String> dubbingLanguagesIdList;
    private List<String> subtitleLanguagesIdList;
    private List<Long> genresIdList;
    private List<Long> subGenresIdList;
    private List<MultipartFile> images;
    private List<String> formattedImages;

}
