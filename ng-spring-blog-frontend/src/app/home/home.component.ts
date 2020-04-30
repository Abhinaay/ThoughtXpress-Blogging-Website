import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AddPostService} from '../add-post.service';
import {PostPayload} from '../add-post/post-payload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Observable<Array<PostPayload>>;
  searchForm: FormGroup;
  search1: any;
  constructor(private postService: AddPostService, private formBuilder: FormBuilder, private router: Router) {
    this.searchForm = this.formBuilder.group({
      name: ''
    });

    }

  ngOnInit(){
    this.posts = this.postService.getAllPosts();
  }

}
