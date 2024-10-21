import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  createNewChannelAction,
  createNewChannelSuccessAction,
  getAlleChannelAction,
  getAlleChannelErrorAction,
  getAlleChannelSuccessAction,
} from './action';
import { ChannelService } from '../../../service-api/channelService';

@Injectable()
export class ChannelsEffects {
  getAllChannelsEffect$;
  createNewChannelsEffect$;

  constructor(
    private actions$: Actions,
    private channelService: ChannelService
  ) {
    this.getAllChannelsEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getAlleChannelAction),
        mergeMap(() =>
          this.channelService.getChannels().pipe(
            map((response) =>
              getAlleChannelSuccessAction({ allChannel: response })
            ),
            catchError(() => of(getAlleChannelErrorAction()))
          )
        )
      )
    );

    this.createNewChannelsEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(createNewChannelAction),
        mergeMap((action) =>
          this.channelService.createNewChannels(action.channel).pipe(
            map((response) =>
              createNewChannelSuccessAction({ channel: response })
            ),
            catchError(() => of(getAlleChannelErrorAction()))
          )
        )
      )
    );
  }
}
