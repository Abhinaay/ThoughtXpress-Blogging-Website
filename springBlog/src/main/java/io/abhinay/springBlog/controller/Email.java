package io.abhinay.springBlog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.abhinay.springBlog.dto.ForgotDto;
import io.abhinay.springBlog.model.User;
import io.abhinay.springBlog.repository.UserRepository;
import io.abhinay.springBlog.service.EmailResponse;
import io.abhinay.springBlog.service.MailService;

@RestController
@RequestMapping("/api/auth")
public class Email {
	
	@Autowired
	MailService emailService;
	
	@Autowired
	UserRepository userRepository;
	
	
	@PostMapping("/sendemail")
	public EmailResponse email(@RequestBody ForgotDto forgotDto) {
		//String username="abhinay";
		String username = forgotDto.getUsername();
		
		EmailResponse emailResponse=new EmailResponse();
		try {
		User user=userRepository.findByUserName(username).orElseThrow(()->
		new UsernameNotFoundException("No user found "+username));
		
			emailService.sendEmail(user);
			userRepository.delete(user);
		} catch (MailException e) {
			// TODO Auto-generated catch block
			emailResponse.setMessage("Mail_Not_Sent");
			return emailResponse;
		} catch (UsernameNotFoundException ue)
		{
			emailResponse.setMessage("Username_Not_Found");
			return emailResponse;
		}
		
		emailResponse.setMessage("Mail Sent");
		return emailResponse;
		
	}


}
