import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { SearchFriendComponent } from './routes/search-friend/search-friend.component';
import { NewsFeedComponent } from './routes/news-feed/news-feed.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { SetupComponent } from './routes/profile/setup/setup.component';
import { NotificationComponent } from './routes/notification/notification.component';


const routes: Routes = [
  {path:"" , pathMatch:"full"  , redirectTo:"login"},
  {path:"login" , component:LoginComponent },
  {path:"search" , component:SearchFriendComponent} , 
  {path:"news-feed" , component:NewsFeedComponent},
  {path:"profile" , children:[{
    path:"setup" , component:SetupComponent
  } , 
  {
    path:"main" , component:ProfileComponent
  }
]},
{path:"notifications" , component:NotificationComponent} , 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
