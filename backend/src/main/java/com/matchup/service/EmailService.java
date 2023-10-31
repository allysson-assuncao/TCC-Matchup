package com.matchup.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSenderImpl mailSender;

    public void sendEmail(String to, String subject, String code) {
        String text = "Olá,\n" +
                "Recebemos uma solicitação para redefinir a senha da sua conta. Se você fez essa solicitação, " +
                "clique no link abaixo e copie esse código no seu navegador para criar uma nova senha:\n" +
                "\n" + code +
                "\n" +
                "localhost/3000/esqueceu_a_senha\n" +
                "\n" +
                "Se você não consegue clicar no link, copie e cole a seguinte URL no seu navegador:\n" +
                "\n" +
                "localhost/3000/esqueceu_a_senha\n" +
                "\n" +
                "Por favor, note que este link expirará em 2 minutos. Se você não solicitou uma redefinição de senha, " +
                "por favor, ignore este e-mail.\n" +
                "\n" +
                "Para sua segurança, nunca compartilhe suas informações de login com ninguém e sempre verifique o " +
                "site ao qual você está sendo direcionado.\n" +
                "\n" +
                "Obrigado,\n" +
                "Equipe Matchup\n";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("matchuptcc@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
