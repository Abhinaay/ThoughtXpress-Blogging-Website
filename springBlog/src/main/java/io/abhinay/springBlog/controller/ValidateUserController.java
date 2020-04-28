package io.abhinay.springBlog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/auth")
public class ValidateUserController {

	@Autowired
	private UserDetailsService  userDetailsService;
	
	ResponseEntity<Boolean> rese;
	
	@GetMapping("/signup")
	public ResponseEntity<Boolean> checkUser(@RequestParam String username) {
		
		
		try {
		UserDetails ud=userDetailsService.loadUserByUsername(username);
		if(ud.getPassword()!=null)
			rese= new ResponseEntity<>(true, HttpStatus.OK);
		else
		{
			rese= new ResponseEntity<>(false, HttpStatus.OK);
			}
		}
		catch(UsernameNotFoundException e)
		{
			
			rese= new ResponseEntity<>(false, HttpStatus.OK);
		}
		
		return rese;
		
	}
}
