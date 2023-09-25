package com.matchup.repository.interest_dependencies;

import com.matchup.model.insterests_dependencies.Platform;
import com.matchup.model.insterests_dependencies.SubGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubGenreRepository extends JpaRepository<SubGenre, Long> {

}
