package com.matchup.repository.interest_dependencies;

import com.matchup.model.insterest.SubGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubGenreRepository extends JpaRepository<SubGenre, Long> {

}
