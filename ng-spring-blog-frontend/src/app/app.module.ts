import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {setupTestingRouter} from '@angular/router/testing';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Ng2Webstorage} from 'ngx-webstorage';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {HttpClientInterceptor} from './http-client-interceptor';
import { PostComponent } from './post/post.component';
import {AuthGuard} from './auth.guard';
import { HeroComponent } from './hero/hero.component';
import {Auth1Guard} from './auth1.guard';
import { FooterComponent } from './footer/footer.component';
import {PipesModule} from 'w-ng5';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AddPostComponent,
    PostComponent,
    HeroComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    PipesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Webstorage.forRoot(),
    RouterModule.forRoot([
      {path: 'hero', component: HeroComponent, canActivate: [Auth1Guard]},
      {path: '', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'register', component: RegisterComponent},
      {path: 'post/:id', component: PostComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent, canActivate: [Auth1Guard]},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]}
    ]),
    HttpClientModule,
    EditorModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
