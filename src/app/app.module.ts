import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { LoginComponent } from './routes/login/login.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { NewsFeedComponent } from './routes/news-feed/news-feed.component';
import {LoadingBarModule} from '@ngx-loading-bar/core'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SearchFriendComponent } from './routes/search-friend/search-friend.component';
import { SetupComponent } from './routes/profile/setup/setup.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    NewsFeedComponent,
    SearchFriendComponent,
    SetupComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoadingBarModule,
    NgxSkeletonLoaderModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
