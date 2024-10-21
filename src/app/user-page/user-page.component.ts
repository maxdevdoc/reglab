import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../login-and-authorization/store/state';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAllUsers } from '../shared/users-block/store/selector';
import { map } from 'rxjs/operators';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  userName!: string;
  user$!: Observable<User | undefined>;
  user!: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private location: Location
  ) {
    this.userName = this.route.snapshot.paramMap.get('userName') || '';
  }

  ngOnInit(): void {
    this.user$ = this.store
      .select(getAllUsers)
      .pipe(
        map((users) => users.find((user) => user.userName === this.userName))
      );

    this.user$.subscribe((data) => {
      this.user = data;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
