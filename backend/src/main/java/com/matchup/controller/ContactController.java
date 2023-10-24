package com.matchup.controller;

import com.matchup.dto.ContactDto;
import com.matchup.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/get-by-user1-id/{user1Id}")
    public ResponseEntity<List<ContactDto>> getContactsByUser1Id(@PathVariable long user1Id) {
        return new ResponseEntity<>(contactService.getContactsByUser1Id(user1Id), HttpStatus.ACCEPTED);
    }

}
