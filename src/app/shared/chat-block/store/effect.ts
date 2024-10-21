import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import {
  getMassageAction,
  getMassageErrorAction,
  getMassageSuccessAction,
  sendMassageAction,
  sendMassageSuccessAction,
  setUserIsOnlineAction,
  setUserIsOnlineActionError,
  setUserIsOnlineActionSuccess,
} from './action';
import { ChatService } from '../../../service-api/chatService';
import { UsersService } from '../../../service-api/usersService';

@Injectable()
export class ChatEffects {
  getMassageEffect$;
  sendMassageEffect;
  setUserIsOnlineEffect$;

  constructor(
    private actions$: Actions,
    private chatService: ChatService,
    private usersService: UsersService
  ) {
    this.getMassageEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getMassageAction),
        mergeMap(() =>
          this.chatService.getMessages().pipe(
            map((response) => getMassageSuccessAction({ massage: response })),
            catchError((error) => of(getMassageErrorAction({ massage: error })))
          )
        )
      )
    );

    this.sendMassageEffect = createEffect(() =>
      this.actions$.pipe(
        ofType(sendMassageAction),
        mergeMap(({ massage }) =>
          this.chatService.sendMessage(massage).pipe(
            map((response) => sendMassageSuccessAction({ message: response })), // Assuming the API responds with the sent message
            catchError((error) => of(getMassageErrorAction({ massage: error })))
          )
        )
      )
    );
    this.setUserIsOnlineEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(setUserIsOnlineAction),
        switchMap(({ userId, is_online }) =>
          this.usersService.setUserOnline(userId, is_online).pipe(
            map(() => setUserIsOnlineActionSuccess({ userId })),
            catchError((error) => of(setUserIsOnlineActionError({ error })))
          )
        )
      )
    );
  }
}
