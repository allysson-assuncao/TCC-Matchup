package com.matchup.service;

import com.matchup.model.User;
import com.matchup.model.VerificationCode;
import com.matchup.repository.UserRepository;
import com.matchup.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class VerificationCodeService {

    @Autowired
    private final VerificationCodeRepository verificationCodeRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final EmailService emailService;

    @Autowired
    public VerificationCodeService(VerificationCodeRepository verificationCodeRepository, UserRepository userRepository, EmailService emailService) {
        this.verificationCodeRepository = verificationCodeRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public void deleteExpiredVerificationCodes() {
        List<VerificationCode> allCodes = verificationCodeRepository.findAll();
        for (VerificationCode code : allCodes) {
            if (code.getExpirationDate().isBefore(LocalDateTime.now())) {
                verificationCodeRepository.delete(code);
            }
        }
    }

    public Long sendCode(String email){
        User user;
        Long id;
        if (userRepository.existsByEmail(email)){
            user = userRepository.findByEmail(email).get();
            id = user.getId();

            Random random = new Random();
            String code = String.format("%06d", random.nextInt(1000000));

            LocalDateTime expirationDate = LocalDateTime.now().plusMinutes(5);
            VerificationCode newCode = new VerificationCode(code, expirationDate);
            newCode = verificationCodeRepository.save(newCode);
            newCode.setUser(user);
            verificationCodeRepository.save(newCode);
            System.out.println("Código: " + code);

            String subject = "Solicitação de Redefinição de Senha";
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
            /*emailService.sendEmail(email, subject, text);*/
            System.out.println("Email enviado!");

            return id;
        }else{
            return null;
        }
    }

    public Boolean verifyCode(String code, Long userId) {
        deleteExpiredVerificationCodes();
        return verificationCodeRepository.findByUserIdAndCode(userId, code) == null;
    }

}
