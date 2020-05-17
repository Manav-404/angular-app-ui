import { Profile } from './Profile';
import { Post } from './Post';

export class Comment{
    id:number;
    text:String;
    profile  :Profile;
    post :Post;
    
}