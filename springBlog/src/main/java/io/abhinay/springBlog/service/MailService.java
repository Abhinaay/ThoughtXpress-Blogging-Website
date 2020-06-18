package io.abhinay.springBlog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import io.abhinay.springBlog.model.User;

@Service
public class MailService {
	

	private JavaMailSender javaMailSender;

	@Autowired
	public MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}
	
	public void sendEmail(User user) throws MailException
	{
		SimpleMailMessage mail=new SimpleMailMessage();
		mail.setTo(user.getEmail());
		mail.setFrom("abhidinanathchauhan@gmail.com");
		mail.setSubject("ThoughtExpress Password Request");
		mail.setText("Hi "+user.getUserName()+", your username is '"+user.getUserName()+"', visit this link to change your password: http://localhost:4200/new-password");
		
		javaMailSender.send(mail);
	}

}
