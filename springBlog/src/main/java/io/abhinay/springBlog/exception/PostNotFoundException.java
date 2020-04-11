package io.abhinay.springBlog.exception;

public class PostNotFoundException extends RuntimeException {
	
	public PostNotFoundException(String str) {
		super(str);
	}

}
