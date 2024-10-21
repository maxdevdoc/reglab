import { Component, OnInit } from '@angular/core';
import { ChannelsBlockComponent } from '../shared/channels-block/channels-block.component';
import { UsersBlockComponent } from '../shared/users-block/users-block.component';
import { UserBlockComponent } from '../shared/user-block/user-block.component';
import { ChatBlockComponent } from '../shared/chat-block/chat-block.component';
import { setCurrentUserAction } from '../login-and-authorization/store/action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    ChannelsBlockComponent,
    UsersBlockComponent,
    UserBlockComponent,
    ChatBlockComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.store.dispatch(setCurrentUserAction({ user }));
    }
  }
}
