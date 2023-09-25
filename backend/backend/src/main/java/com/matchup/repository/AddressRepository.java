package com.matchup.repository;

import com.matchup.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findById(long id);

    List<Address> findByNumber(int number);

    List<Address> findByZipcode(String zipcode);

    @Query("SELECT a FROM Address a WHERE a.street LIKE %:street%")
    List<Address> findByPartOfTheStreet(@Param("street") String partOfTheStreet);
    //List<Address> findByStreetLikeIgnoreCase(@Param("street") String partOfTheStreet);

    @Query("SELECT a FROM Address a WHERE a.neighborhood LIKE %:neighborhood%")
    List<Address> findByPartOfTheNeighborhood(@Param("neighborhood") String partOfTheNeighborhood);

    @Query("SELECT a FROM Address a WHERE a.state LIKE %:state%")
    List<Address> findByPartOfTheState(@Param("state") String partOfTheState);

}
