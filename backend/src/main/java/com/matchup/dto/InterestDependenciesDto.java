package com.matchup.dto;

import com.matchup.model.insterest.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class InterestDependenciesDto {
    private List<Company> companies;

    private List<AgeRating> ageRatings;

    private List<Genre> genres;

    private List<SubGenre> subGenres;

    private List<Platform> platforms;
}
