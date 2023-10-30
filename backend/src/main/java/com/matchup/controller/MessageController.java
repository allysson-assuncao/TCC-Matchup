package com.matchup.controller;

import com.matchup.dto.MessageDto;
import com.matchup.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/message")
public class MessageController {

    private final MessageService messageService;
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public MessageController(MessageService messageService, SimpMessagingTemplate simpMessagingTemplate) {
        this.messageService = messageService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }


    @PostMapping("/send-message")
    @PostAuthorize("true")
    public ResponseEntity<MessageDto> sendMessage(@RequestBody MessageDto messageDto) {
        return new ResponseEntity<>(messageService.sendMessage(messageDto), HttpStatus.OK);
    }

    /*@MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message){
        return message;
    }*/

    @MessageMapping("/private-message")
    public MessageDto receiveMessage(@Payload MessageDto message){
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(messageService.sendMessage(message).getReceiverId()),"/private", message);
        System.out.println(message.toString());
        return message;
    }

    @GetMapping("/get-by-last-message-{lastMessageDate}-and-users-id-{user1Id}-{user2Id}")
    public List<MessageDto> getLastMessages(@PathVariable LocalDateTime lastMessageDate, @PathVariable long user1Id, @PathVariable long user2Id) {
        return messageService.getMessageListByLastMessageDate(lastMessageDate, user1Id, user2Id);
    }

}

