package com.matchup.controller;

import com.matchup.model.message.Message;
import com.matchup.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/message")
public class MessageController {

    private final MessageService messageService;


    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    /*@PostMapping("/send-solicitation")
    @PostAuthorize("true")
    public ResponseEntity<Message> sendFriendshipSolicitationNotification(@RequestBody Map<String, Long> requestBody) {
        return new ResponseEntity<>(messageService.sendMessage, HttpStatus.OK);
    }*/

}

