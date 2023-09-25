package com.matchup.service;

import com.matchup.model.Address;
import com.matchup.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {this.addressRepository = addressRepository;}

    public Address saveAddress(Address addressToSave){
        return addressRepository.save(addressToSave);
    }

//    public Page<Address> findByPartOfTheStreet(String partOfTheStreet){
//        return addressRepository.findByPartOfTheStreet(partOfTheStreet);
//    }

}
