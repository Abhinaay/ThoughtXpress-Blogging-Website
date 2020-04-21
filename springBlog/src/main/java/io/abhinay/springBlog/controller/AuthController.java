package io.abhinay.springBlog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.abhinay.springBlog.dto.LoginRequest;
import io.abhinay.springBlog.dto.RegisterRequest;
import io.abhinay.springBlog.service.AuthService;
import io.abhinay.springBlog.service.AuthenticationResponse;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/signup")
	public ResponseEntity signup(@RequestBody RegisterRequest registerRequest) {
		
		authService.signup(registerRequest);
		
		return new ResponseEntity(HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public AuthenticationResponse login(@RequestBody LoginRequest loginrequest) {
		
		return authService.login(loginrequest);
	}

}
