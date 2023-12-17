package com.matchup.repository;

import com.matchup.model.Interest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestRepository extends JpaRepository<Interest, Long>, JpaSpecificationExecutor<Interest> {

    List<Interest> findById(long id);

    Page<Interest> findAll(Specification<Interest> specification, Pageable pageable);

    /*@Query("SELECT i.name FROM Interest i WHERE i.id IN (" +
            "SELECT ui.interests_id FROM user_interests ui WHERE ui.user_id = :userId1 " +
            "INTERSECT SELECT ui.interests_id FROM user_interests ui WHERE ui.user_id = :userId2)"
    )
    List<String> findCommonInterests(@Param("userId1") Long userId1, @Param("userId2") Long userId2);*/

    @Query("SELECT i.name FROM Interest i JOIN i.users u1 JOIN i.users u2 WHERE u1.id = :userId1 AND u2.id = :userId2")
    List<String> findCommonInterests(@Param("userId1") Long userId1, @Param("userId2") Long userId2);




    // <editor-fold desc="SQL to add Language List">

    // </editor-fold>

}
