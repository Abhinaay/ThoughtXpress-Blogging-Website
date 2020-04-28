package io.abhinay.springBlog.service;


import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
	
	@Autowired
	private UserDetailsService  userDetailsService;
	
	public int signup(RegisterRequest registerRequest) throws SQLIntegrityConstraintViolationException {
		
		try {
			UserDetails userDetails = userDetailsService.loadUserByUsername(registerRequest.getUsername());
			return 1;
		} catch (UsernameNotFoundException e) {
			
			User user=new User();
			user.setUserName(registerRequest.getUsername());
			user.setPassword(encodePassword(registerRequest.getPassword()));
			user.setEmail(registerRequest.getEmail());
			
			userrepository.save(user);
			
			return 0;
		} catch (Exception e2)
		{
			return 2;
		}
		
		
	}

	private String encodePassword(String password) {
		
		return passwordEncoder.encode(password);
	}

	public AuthenticationResponse login(LoginRequest loginrequest) {
		try {
			Authentication authenticate=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginrequest.getUsername(),
					loginrequest.getPassword()));
			
			SecurityContextHolder.getContext().setAuthentication(authenticate);
			AuthenticationResponse aR = new AuthenticationResponse();
			aR.setAuthenticationToken(jwtProvider.generateToken(authenticate));
			aR.setUsername(loginrequest.getUsername());
			aR.setStatus(true);
			return aR;
		} catch (Exception e) {
			AuthenticationResponse aR1 = new AuthenticationResponse();
			aR1.setStatus(false);
			aR1.setAuthenticationToken("");
			aR1.setUsername("");
			return aR1;
		}
	}

	public Optional<org.springframework.security.core.userdetails.User> getCurrentUser() {
		org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return Optional.of(principal);
	}

}
