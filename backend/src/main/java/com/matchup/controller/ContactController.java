package com.matchup.controller;

import com.matchup.dto.ContactDto;
import com.matchup.dto.NotificationDto;
import com.matchup.dto.SolicitationResponseDto;
import com.matchup.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public ContactController(ContactService contactService, SimpMessagingTemplate simpMessagingTemplate) {
        this.contactService = contactService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }


    /*@GetMapping("/get-by-user1-id/{user1Id}")
    public ResponseEntity<List<ContactDto>> getContactsByUser1Id(@PathVariable long user1Id) {
        return new ResponseEntity<>(contactService.getContactsByUser1Id(user1Id), HttpStatus.ACCEPTED);
    }*/

    @MessageMapping("/get-contacts-list")
    public List<ContactDto> getContactsList(/*@AuthenticationPrincipal UserDetails userDetails*/ String username) {
        System.out.println("CHEGOU! " + username);
        List<ContactDto> contactDtoList = contactService.getContactsByUser1Username(username);

        if(contactDtoList != null && !contactDtoList.isEmpty()){
            System.out.println("CHEGOU2! " + contactDtoList.get(0).getUser1Id());
            simpMessagingTemplate.convertAndSendToUser(
                    contactDtoList.get(0).getUser1Id() + "", "/queue/receive-contacts-list", contactDtoList);
        }

        return contactDtoList;
    }

}
