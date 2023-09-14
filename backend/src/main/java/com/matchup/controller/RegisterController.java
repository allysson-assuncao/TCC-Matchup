package com.matchup.controller;

import com.matchup.dto.UserDto;
import com.matchup.model.Address;
import com.matchup.model.Interest;
import com.matchup.model.User;
import com.matchup.service.AddressService;
import com.matchup.service.InterestService;
import com.matchup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.DateTimeException;
import java.time.LocalDate;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/register")
public class RegisterController {

    private final UserService userService;
    private final AddressService addressService;

    @Autowired
    public RegisterController(UserService userService, AddressService addressService) {
        this.userService = userService;
        this.addressService = addressService;
    }

    @PostMapping("/address")
    @PostAuthorize("true")
    public ResponseEntity<Address> registerAddress(@RequestBody Address address) {
        return new ResponseEntity<>(addressService.saveAddress(address), HttpStatus.OK);
    }

    @PostMapping("/user")
    @PostAuthorize("true")
    public ResponseEntity<User> register(@RequestBody UserDto userDto) {
        System.out.println("register-user");
        System.out.println(userDto.getBirthDate());

        /*if (!userService.verifyDate(userDto.getBirthDate())){
            throw new DateTimeException(userDto.getBirthDate().toString());
        }*/

        return new ResponseEntity<>(userService.registerUser(userDto), HttpStatus.OK);
    }

}
