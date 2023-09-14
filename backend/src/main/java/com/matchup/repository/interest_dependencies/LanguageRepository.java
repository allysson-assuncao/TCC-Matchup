package com.matchup.repository.interest_dependencies;

import com.matchup.model.insterests_dependencies.Language;
import com.matchup.model.insterests_dependencies.Platform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    List<Language> findByIdIn(List<String> ids);
}
