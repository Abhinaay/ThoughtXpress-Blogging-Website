package io.abhinay.springBlog.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.abhinay.springBlog.dto.LoginRequest;
import io.abhinay.springBlog.dto.RegisterRequest;
import io.abhinay.springBlog.model.User;
import io.abhinay.springBlog.repository.UserRepository;
import io.abhinay.springBlog.security.JwtProvider;


@Service
public class AuthService {

	@Autowired
	private UserRepository userrepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtProvider jwtProvider;
	
	public void signup(RegisterRequest registerRequest) {
		
		User user=new User();
		user.setUserName(registerRequest.getUsername());
		user.setPassword(encodePassword(registerRequest.getPassword()));
		user.setEmail(registerRequest.getEmail());
		
		userrepository.save(user);
	}

	private String encodePassword(String password) {
		
		return passwordEncoder.encode(password);
	}

	public String login(LoginRequest loginrequest) {
		Authentication authenticate=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginrequest.getUsername(),
				loginrequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authenticate);
		return jwtProvider.generateToken(authenticate);
	}

	public Optional<org.springframework.security.core.userdetails.User> getCurrentUser() {
		org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return Optional.of(principal);
	}

}
