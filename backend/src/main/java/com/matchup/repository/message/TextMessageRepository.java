package com.matchup.repository.message;

import com.matchup.model.message.TextMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TextMessageRepository extends JpaRepository<TextMessage, Long> {



}
