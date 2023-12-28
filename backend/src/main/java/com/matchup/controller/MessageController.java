package com.matchup.controller;

import com.matchup.dto.MessageDto;
import com.matchup.dto.UsersIdDto;
import com.matchup.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.Authentication;
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


    @MessageMapping("/chat")
    public void sendPrivateMessage(Authentication authentication, Message message) {
        System.out.println("oi");
       /* message.setFrom(authentication.getName());
        messagingTemplate.convertAndSendToUser(message.getTo(), "/queue/messages", message);*/
    }

    /*@MessageMapping("/user/{userId}/queue/messages")*/
    /*@MessageMapping("/send-private-massage-to/{userId}")
    public void handlePrivateMessage(@Payload Message message, @DestinationVariable String userId) {
        System.out.println(userId);
        System.out.println(message.toString() + "  " + message.getPayload().toString());
        simpMessagingTemplate.convertAndSend("/user/" + userId + "/queue/messages", message);
    }*/

    @MessageMapping("/send-private-message")
    /*@SendToUser("/queue/private-messages")*/
    public void sendPrivateMessage(MessageDto messageDto) {
        messageDto = messageService.sendMessage(messageDto);
        messageDto.setContactId(messageService.findContactId(messageDto.getReceiverId(), messageDto.getSenderId()));
        simpMessagingTemplate.convertAndSendToUser(
                messageDto.getReceiverId()+"", "/queue/private-messages", messageDto);
        messageDto.setContactId(messageService.findContactId(messageDto.getSenderId(), messageDto.getReceiverId()));
        simpMessagingTemplate.convertAndSendToUser(
                messageDto.getSenderId()+"", "/queue/private-messages", messageDto);
    }

    @MessageMapping("/view-message")
    /*@SendToUser("/queue/private-messages")*/
    public void viewMessage(long messageId) {
        System.out.println("MENSAGEM VISUALIZADA: " +messageId);
        messageService.viewMessageById(messageId);
    }

    @MessageMapping("/get-private-messages")
    /*@SendToUser("/queue/private-messages")*/
    public void getPrivateMessageList(UsersIdDto usersIdDto) {
        System.out.println(usersIdDto);
        var messageDtoList = messageService.findMessageListByUsersId(usersIdDto.getUser1Id(), usersIdDto.getUser2Id());
        simpMessagingTemplate.convertAndSendToUser(
                usersIdDto.getUser1Id()+"", "/queue/receive-message-list", messageDtoList);

    }





    /*@MessageMapping("/private-message")
    public MessageDto receiveMessage(@Payload MessageDto message){
        System.out.println("mensagem recebida!!!!!!!!!!!!!!!!");
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(messageService.sendMessage(message).getReceiverId()),"/private", message);
        System.out.println(message.toString());
        return message;
    }*/

    @GetMapping("/get-by-last-message-{lastMessageDate}-and-users-id-{user1Id}-{user2Id}")
    public List<MessageDto> getLastMessages(@PathVariable LocalDateTime lastMessageDate, @PathVariable long user1Id, @PathVariable long user2Id) {
        return messageService.getMessageListByLastMessageDate(lastMessageDate, user1Id, user2Id);
    }

}
