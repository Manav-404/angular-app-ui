import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './routes/login/login.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { NewsFeedComponent } from './routes/news-feed/news-feed.component';
import {LoadingBarModule} from '@ngx-loading-bar/core'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SearchFriendComponent } from './routes/search-friend/search-friend.component';
import { SetupComponent } from './routes/profile/setup/setup.component';
import { authInterceptorProviders } from './auth/authInterceptor';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    NewsFeedComponent,
    SearchFriendComponent,
    SetupComponent,
    SafePipe,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxSkeletonLoaderModule , 
    HttpClientModule , 
    BrowserAnimationsModule ,
    ToastrModule.forRoot() 

    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
