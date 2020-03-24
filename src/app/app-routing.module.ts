import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { SearchFriendComponent } from './routes/search-friend/search-friend.component';
import { NewsFeedComponent } from './routes/news-feed/news-feed.component';


const routes: Routes = [
  {path:"" , pathMatch:"full"  , redirectTo:"login"},
  {path:"login" , component:LoginComponent },
  {path:"search" , component:SearchFriendComponent} , 
  {path:"news-feed" , component:NewsFeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
