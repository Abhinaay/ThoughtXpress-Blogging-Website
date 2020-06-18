import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AddPostService} from '../add-post.service';
import {PostPayload} from '../add-post/post-payload';
import {LocalStorageService} from 'ngx-webstorage';
import {DynamicLoaderService} from 'angular-dynamic-loader';


function myFunction() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('myBar').style.width = scrolled + '%';

}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // tslint:disable-next-line:ban-types
  permaLink: Number;
  post: PostPayload;
  constructor(private router: ActivatedRoute,
              private postService: AddPostService,
              private localStorageService: LocalStorageService,
              private loader: DynamicLoaderService) { }

  ngOnInit() {
    this.loader.show();
    // tslint:disable-next-line:only-arrow-functions
    window.onscroll = function() {myFunction(); };

    this.router.params.subscribe(params => {
      this.permaLink = params.id;
    });

    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
      this.loader.hide();
    }, (err: any) => {
      console.log('Failure Response');
      this.loader.hide();
    });
  }


  isUserAuthenticated() {
    if (this.localStorageService.retrieve('username') === this.post.username)
    {
      return true;
    }
    else {
      return false;
    }
  }

  deletePost() {
    this.loader.show();
    this.postService.deletePost(this.permaLink).subscribe(data => {
      if (data) {
       console.log('Post Deleted Successfully!!');
       this.loader.hide();
      }
      else {
        console.log('Post Deletion Failed!!');
        this.loader.hide();
      }
    });
  }
}
