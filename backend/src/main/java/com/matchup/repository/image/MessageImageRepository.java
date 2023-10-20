package com.matchup.repository.image;

import com.matchup.model.image.MessageImage;
import com.matchup.model.image.ProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageImageRepository extends JpaRepository<MessageImage, Long> {

    Optional<MessageImage> findById(long id);

    Optional<MessageImage> findByUserId(long id);

    void deleteById(long id);

}
