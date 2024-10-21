import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getAlleChannelAction } from '../../channels-block/store/action';
import {catchError, exhaustMap, map, mergeMap, of} from 'rxjs';
import { UsersService } from '../../../service-api/usersService';
import {
  clearStateUserChannelAction,
  getAlleUsersErrorAction,
  getAlleUsersSuccessAction,
  getUserChannelAction,
  getUserChannelErrorAction,
  getUserChannelSuccessAction,
} from './action';
import {tap} from "rxjs/operators";

@Injectable()
export class UsersEffects {
  getAllUsersEffect$;
  getUserChannelEffect$;

  constructor(
    private actions$: Actions,
    private store: Store,
    private usersService: UsersService
  ) {
    this.getAllUsersEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getAlleChannelAction),
        mergeMap(() =>
          this.usersService.getAllUsers().pipe(
            map((response) =>
              getAlleUsersSuccessAction({ allUsers: response })
            ),
            catchError(() => of(getAlleUsersErrorAction()))
          )
        )
      )
    );

    this.getUserChannelEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getUserChannelAction),
        exhaustMap(() =>
          this.usersService.getUserChannel().pipe(
            tap(()=>{
              this.store.dispatch(clearStateUserChannelAction())
            }),
            map((response) =>
              getUserChannelSuccessAction({ userChannel: response })
            ),
            catchError(() => of(getUserChannelErrorAction()))
          )
        )
      )
    );
  }
}
