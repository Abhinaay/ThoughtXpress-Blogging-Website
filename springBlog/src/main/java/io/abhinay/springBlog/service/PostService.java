package io.abhinay.springBlog.service;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import io.abhinay.springBlog.dto.PostDto;
import io.abhinay.springBlog.exception.PostNotFoundException;
import io.abhinay.springBlog.model.Post;
import io.abhinay.springBlog.repository.PostRepository;


@Service
public class PostService {

	@Autowired
	private AuthService authService;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserDetailsService  userDetailsService;
	
	
	public List<PostDto> showAllPosts() {
		List<Post> posts=postRepository.findAll();
		Collections.reverse(posts);
		return posts.stream().map(this::mapFromPostToDto).collect(Collectors.toList());
	}
	
	public void createPost(PostDto postDto) {
		
		Post post=mapFromDtoToPost(postDto);
		postRepository.save(post);
	}
	
	private PostDto mapFromPostToDto(Post post)
	{
		PostDto postDto = new PostDto();
		postDto.setId(post.getId());
		postDto.setContent(post.getContent());
		postDto.setTitle(post.getTitle());
		postDto.setUsername(post.getUsername());
		return postDto;
	}
	
	private Post mapFromDtoToPost(PostDto postDto)
	{
		Post post=new Post();
		post.setTitle(postDto.getTitle());
		post.setContent(postDto.getContent());
		User loggedInUser=authService.getCurrentUser().orElseThrow(()->new IllegalArgumentException("No User Logged In"));
		post.setUsername(loggedInUser.getUsername());
		post.setCreatedOn(Instant.now());
		post.setUpdatedOn(Instant.now());
		
		return post;
	}
	
	public PostDto readSinglePost(Long id) {
		 Post post=postRepository.findById(id).orElseThrow(()->new PostNotFoundException("For id "+id));
		 return mapFromPostToDto(post);
	}

	public boolean deleteSinglePost(Long id) {
		if(id == null)
			return false;
		try {
			postRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
		
	}

}
