package com.matchup.repository.image;

import com.matchup.model.image.InterestImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterestImageRepository extends JpaRepository<InterestImage, Long> {

    Optional<InterestImage> findById(long id);


    void deleteById(long id);

    void deleteByInterestId(long id);

}
