import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AddPostService} from '../add-post.service';
import {PostPayload} from '../add-post/post-payload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DynamicLoaderService} from 'angular-dynamic-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Observable<Array<PostPayload>>;
  searchForm: FormGroup;
  search1: any;
  constructor(private postService: AddPostService,
              private formBuilder: FormBuilder,
              private router: Router,
              private loader: DynamicLoaderService) {
    this.searchForm = this.formBuilder.group({
      name: ''
    });

    }

  ngOnInit(){
    this.loader.show();
    this.posts = this.postService.getAllPosts();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.loader.hide();
    }, 5000);
  }

}
