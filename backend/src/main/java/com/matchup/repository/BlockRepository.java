package com.matchup.repository;

import com.matchup.model.Block;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlockRepository extends JpaRepository<Block, Long> {

    boolean existsByBlockedIdAndBlockerId(long blockerId, long blockedId);

    @Query("SELECT b.blocker.id FROM Block b WHERE b.blocked.id = :userId")
    List<Long> findBlockerIdListByBlockedId(@Param("userId") Long userId);

    @Query("SELECT b.blocked.id FROM Block b WHERE b.blocker.id = :userId")
    List<Long> findBlockedIdListByBlockerId(@Param("userId") Long userId);

    @Transactional
    void deleteByBlockerIdAndBlockedId(long blockerId, long blockedId);


    
    


}