import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  addUsersInChannelAction,
  addUsersInChannelSuccessAction,
  addUsersInChannelErrorAction,
  navigationToUserPageAction,
} from './action';
import { Router } from '@angular/router';
import { UsersService } from '../../../service-api/usersService';
import { tap } from 'rxjs/operators';
import { Notyf } from 'notyf';

@Injectable()
export class UserEffects {
  navigationToUserPageEffect$;
  addUsersInChannelEffect$;
  addUsersInChannelSuccessEffect$;
  addUsersInChannelErrorEffect$;

  private notyf: Notyf;

  constructor(
    private actions$: Actions,
    private router: Router,
    private usersService: UsersService
  ) {
    this.notyf = new Notyf({
      duration: 3000,
      position: {
        x: 'right',
        y: 'top',
      },
    });

    this.navigationToUserPageEffect$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(navigationToUserPageAction),
          tap(() => {
            this.router.navigate(['/user']);
          })
        ),
      { dispatch: false }
    );

    this.addUsersInChannelEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addUsersInChannelAction),
        mergeMap((action) =>
          this.usersService.addUserInChannel(action.usersChannel).pipe(
            map((response) => addUsersInChannelSuccessAction({userChannel: response})),
            catchError(() => of(addUsersInChannelErrorAction()))
          )
        )
      )
    );

    this.addUsersInChannelSuccessEffect$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(addUsersInChannelSuccessAction),
          tap(() => {
            this.notyf.success('Успешно добавлены в канал');
          })
        ),
      { dispatch: false }
    );

    this.addUsersInChannelErrorEffect$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(addUsersInChannelErrorAction),
          tap(() => {
            this.notyf.success(
              'Упс что-то пошло не так. Пользователи не были добавленны в канал, попробуйте позже'
            );
          })
        ),
      { dispatch: false }
    );
  }
}
