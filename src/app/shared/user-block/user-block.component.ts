import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserName } from '../../login-and-authorization/store/selector';
import { AsyncPipe } from '@angular/common';
import { userLogOutAction } from '../../login-and-authorization/store/action';
import { navigationToUserPageAction } from './store/action';
import {User} from "../../login-and-authorization/store/state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-block',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-block.component.html',
  styleUrl: './user-block.component.css',
})
export class UserBlockComponent implements OnInit {
  currentUser$!: Observable<string>;
  constructor(private store: Store) {}

  navigationToUserPage() {
    this.store.dispatch(navigationToUserPageAction());
  }

  ngOnInit() {
    this.currentUser$ = this.store.select(getCurrentUserName);
  }

  logout() {
    this.store.dispatch(userLogOutAction());
  }
}
