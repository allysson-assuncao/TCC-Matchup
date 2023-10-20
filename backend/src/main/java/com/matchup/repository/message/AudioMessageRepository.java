package com.matchup.repository.message;

import com.matchup.model.message.AudioMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AudioMessageRepository extends JpaRepository<AudioMessage, Long> {



}
