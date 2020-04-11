package io.abhinay.springBlog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.abhinay.springBlog.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

}
