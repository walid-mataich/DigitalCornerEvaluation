package com.digitalcorner.evaluation_app.services;


import com.digitalcorner.evaluation_app.dto.MailBody;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }


    public void sendSimpleMail(MailBody mailBody) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(mailBody.to());
        message.setSubject(mailBody.subject());
        message.setFrom("j75611986@gmail.com");
        message.setText(mailBody.text());

        javaMailSender.send(message);
    }
}
