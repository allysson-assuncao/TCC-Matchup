package com.matchup.repository.interest_dependencies;

import com.matchup.model.insterests_dependencies.AgeRating;
import com.matchup.model.insterests_dependencies.Platform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgeRatingRepository extends JpaRepository<AgeRating, Long> {

}
