package com.matchup.repository;

import com.matchup.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    Optional<Contact> findById(long id);

    Optional<List<Contact>> findContactsByUser1Id(long user1Id);

    boolean existsByUser1IdAndUser2Id(long user1Id, long user2Id);

}
