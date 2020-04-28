package io.abhinay.springBlog.controller;



import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.abhinay.springBlog.dto.LoginRequest;
import io.abhinay.springBlog.dto.PostDto;
import io.abhinay.springBlog.dto.RegisterRequest;
import io.abhinay.springBlog.model.User;
import io.abhinay.springBlog.service.AuthService;
import io.abhinay.springBlog.service.AuthenticationResponse;



@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/signup")
	public ResponseEntity<Integer> signup(@RequestBody RegisterRequest registerRequest) {
		
		int i;
		try {
			i = authService.signup(registerRequest);
		} catch (SQLIntegrityConstraintViolationException e) {
			
			i=1;
		}
		
		return new ResponseEntity(new Integer(i), HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public AuthenticationResponse login(@RequestBody LoginRequest loginrequest) {
		
		return authService.login(loginrequest);
	}
	

}
