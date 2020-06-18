import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostPayload} from './add-post/post-payload';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient: HttpClient) { }

  addPost(postPayload: PostPayload) {
    return this.httpClient.post('https://spring-blog-backend.herokuapp.com/api/posts/create', postPayload);
  }

  getAllPosts(): Observable<Array<PostPayload>>{
    return this.httpClient.get<Array<PostPayload>>('https://spring-blog-backend.herokuapp.com/api/posts/all');
  }

  // tslint:disable-next-line:ban-types
  getPost(permaLink: Number): Observable<PostPayload>{
    return this.httpClient.get<PostPayload>('https://spring-blog-backend.herokuapp.com/api/posts/get/' + permaLink);
  }

  // tslint:disable-next-line:ban-types
  deletePost(permaLink: Number): Observable<boolean> {
    return this.httpClient.get<boolean>('https://spring-blog-backend.herokuapp.com/api/posts/delete/id/' + permaLink);
  }
}
