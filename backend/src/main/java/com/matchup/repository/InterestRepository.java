package com.matchup.repository;

import com.matchup.model.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestRepository extends JpaRepository<Interest, Long> {

    List<Interest> findById(long id);

    @Query("SELECT i FROM Interest i WHERE i.name LIKE %:name%")
    List<Interest> findByPartOfTheName(@Param("name") String partOfTheName);

    @Query("SELECT i FROM Interest i JOIN Genre g WHERE g.name LIKE %:genre%")
    List<Interest> findByPartOfTheGenre(@Param("genre") String partOfTheGenre);

    @Query("SELECT i FROM Interest i JOIN SubGenre s WHERE s.name LIKE %:sub_genre%")
    List<Interest> findByPartOfTheSubGenre(@Param("sub_genre") String partOfTheSubGenre);

    @Query("SELECT i FROM Interest i WHERE i.company LIKE %:company%")
    List<Interest> findByPartOfTheCompany(@Param("company") String partOfTheCompany);

    @Query("SELECT i FROM Interest i JOIN Platform p WHERE p.name LIKE %:platform%")
    List<Interest> findByPartOfThePlatform(@Param("platform") String partOfThePlatform);

    //Price

    @Query("SELECT i FROM Interest i JOIN AgeRating a WHERE a.name = :age")
    List<Interest> findByAgeRating(@Param("age") String age);


    // <editor-fold desc="SQL to add Language List">

//    // </editor-fold>

}
