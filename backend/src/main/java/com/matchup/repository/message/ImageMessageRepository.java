package com.matchup.repository.message;

import com.matchup.model.message.ImageMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageMessageRepository extends JpaRepository<ImageMessage, Long> {



}
