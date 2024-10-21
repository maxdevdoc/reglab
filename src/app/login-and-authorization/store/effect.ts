import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getAllUserAction,
  getAllUserErrorAction,
  getAllUserSuccessAction,
  loginErrorInvalidDataAction,
  navigationToLoginAction,
  userLoginSuccessAction,
  userLogOutAction,
  userRegistrationAction,
  userRegistrationErrorAction,
  userRegistrationSuccessAction,
} from './action';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { catchError, map, mergeMap, of } from 'rxjs';
import { LoginAndRegistrationService } from '../../service-api/loginAndRegistrationService';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Store } from '@ngrx/store';
import { User } from './state';

@Injectable()
export class LoginAndAuthorizationEffects {
  getAllUserAction$;
  loginErrorEffect$;
  userLoginSuccessEffect$;
  userLogOutEffect$;
  userRegistrationErrorEffect$;
  userRegistrationEffect$;
  userRegistrationSuccessEffect;

  private notyf: Notyf;

  constructor(
    private loginAndRegistrationService: LoginAndRegistrationService,
    private actions$: Actions,
    private router: Router,
    private store: Store
  ) {
    this.notyf = new Notyf({
      duration: 3000,
      position: {
        x: 'right',
        y: 'top',
      },
    });

    this.getAllUserAction$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getAllUserAction),
        mergeMap(() =>
          this.loginAndRegistrationService.getAllUsers().pipe(
            map((response) => getAllUserSuccessAction({ users: response })),
            catchError(() => of(getAllUserErrorAction()))
          )
        )
      )
    );

    this.loginErrorEffect$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(loginErrorInvalidDataAction),
          tap(() => {
            this.notyf.error('Неверный логин или пароль');
          })
        ),
      { dispatch: false }
    );

    this.userLoginSuccessEffect$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(userLoginSuccessAction),
          tap(({ user }) => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/']);
          })
        ),
      { dispatch: false }
    );

    this.userLogOutEffect$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(userLogOutAction),
          tap(() => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
          })
        ),
      { dispatch: false }
    );

    this.userRegistrationEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userRegistrationAction),
        mergeMap((action) =>
          this.loginAndRegistrationService.registrationUser(action.user).pipe(
            map((response) => {
              return userRegistrationSuccessAction({ user: response });
            }),
            catchError(() => of(userRegistrationErrorAction()))
          )
        )
      )
    );

    this.userRegistrationSuccessEffect = createEffect(
      () =>
        this.actions$.pipe(
          ofType(userRegistrationSuccessAction),
          tap(() => {
            this.notyf.success(
              'Вы успешно зарегестрировались, осталось совершить вход!'
            );
            this.store.dispatch(navigationToLoginAction());
          })
        ),
      { dispatch: false }
    );

    this.userRegistrationErrorEffect$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(userRegistrationErrorAction),
          tap(() => {
            this.notyf.error('Что-то пошло не так');
          })
        ),
      { dispatch: false }
    );
  }
}
