package com.matchup.repository.message;

import com.matchup.model.message.Audio;
import com.matchup.model.message.ImageMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AudioRepository extends JpaRepository<Audio, Long> {


}