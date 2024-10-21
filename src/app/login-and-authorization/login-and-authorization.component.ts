import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  navigationToRegistrationAction,
  navigationToLoginAction,
  getAllUserAction,
  loginErrorInvalidDataAction,
  userLoginSuccessAction,
  userRegistrationAction,
  registrationErrorInvalidDataAction,
  setCurrentUserAction,
} from './store/action';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getAllUser, getIsLoginPage } from './store/selector';
import { map, Observable, Subject, take, takeUntil } from 'rxjs';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-login-and-authorization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-and-authorization.component.html',
  styleUrls: ['./login-and-authorization.component.css'],
})
export class LoginAndAuthorizationComponent implements OnInit, OnDestroy {
  isLoginPage = signal(true);
  allUsers$!: Observable<any[]>;
  newUser!: any;

  private destroy$ = new Subject<void>();
  private notyf: Notyf;
  constructor(
    private store: Store,
    private router: Router
  ) {
    this.router.url === '/login'
      ? this.store.dispatch(navigationToLoginAction())
      : this.store.dispatch(navigationToRegistrationAction());

    this.store.dispatch(getAllUserAction());
    this.allUsers$ = this.store.select(getAllUser);

    this.notyf = new Notyf({
      duration: 3000,
      position: {
        x: 'right',
        y: 'top',
      },
    });
  }

  ngOnInit() {
    this.store
      .select(getIsLoginPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.isLoginPage.set(value ?? true);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  navigateToRegistrationPage() {
    this.store.dispatch(navigationToRegistrationAction());
  }

  navigateToLoginPage() {
    this.store.dispatch(navigationToLoginAction());
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.allUsers$
        .pipe(
          map((users) =>
            users.find(
              (user) => user.userName === username && user.password === password
            )
          ),
          takeUntil(this.destroy$)
        )
        .subscribe((foundUser) => {
          if (foundUser) {
            const currentUser = {
              id: foundUser.id,
              userName: foundUser.userName,
            };
            this.store.dispatch(setCurrentUserAction({ user: currentUser }));
            this.store.dispatch(userLoginSuccessAction({ user: currentUser }));
          } else {
            this.store.dispatch(loginErrorInvalidDataAction());
          }
        });
    } else {
      this.formNotValid();
    }
  }

  onSubmitRegistration() {
    if (this.registrationForm.valid) {
      const { username, password } = this.registrationForm.value;
      this.allUsers$
        .pipe(
          map((users) => !users.some((user) => user.username === username)),
          take(1),
          takeUntil(this.destroy$)
        )
        .subscribe((canRegister) => {
          if (canRegister) {
            this.newUser = {
              id: Math.floor(Math.random() * 1000).toString(),
              userName: username,
              password,
              is_online: false,
            };
            this.store.dispatch(userRegistrationAction({ user: this.newUser }));
          } else {
            this.store.dispatch(registrationErrorInvalidDataAction());
          }
        });
    } else {
      this.formNotValid();
    }
  }

  formNotValid() {
    this.notyf.error('Поля не заполненны');
  }
}
