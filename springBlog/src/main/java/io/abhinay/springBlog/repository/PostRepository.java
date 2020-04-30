package io.abhinay.springBlog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.abhinay.springBlog.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	
	@Query("SELECT p FROM Post p WHERE p.username = :username")
	List<Post> findByUsername(@Param("username") String username);
	

}
