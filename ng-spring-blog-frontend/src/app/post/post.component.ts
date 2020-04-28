import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AddPostService} from '../add-post.service';
import {PostPayload} from '../add-post/post-payload';


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
  constructor(private router: ActivatedRoute, private postService: AddPostService) { }

  ngOnInit() {

    // tslint:disable-next-line:only-arrow-functions
    window.onscroll = function() {myFunction(); };

    this.router.params.subscribe(params => {
      this.permaLink = params.id;
    });

    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
    }, (err: any) => {
      console.log('Failure Response');
    });
  }



}
