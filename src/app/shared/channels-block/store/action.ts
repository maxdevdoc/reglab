import { createAction, props } from '@ngrx/store';
import { Channel } from './state';

////////////////////CHANGE-CHANNELS////////////////////////////////////
export const changeChannel = createAction(
  '[Main Page Block Channel] Change channels',
  props<{ channel: Channel }>()
);

////////////////////GET-ALL-CHANNELS///////////////////////////////////
export const getAlleChannelAction = createAction(
  '[Main Page Block Channel] Get all channel'
);

export const getAlleChannelSuccessAction = createAction(
  '[Main Page Block Channel] Get all channel success',
  props<{ allChannel: Channel[] }>()
);

export const getAlleChannelErrorAction = createAction(
  '[Main Page Block Channel] Get all channel error'
);

//////////////////CREATE-NEW-CHANNEL/////////////////////////////////////
export const createNewChannelAction = createAction(
  '[Main Page Block Channel] Create new channel',
  props<{ channel: Channel }>()
);

export const createNewChannelSuccessAction = createAction(
  '[Main Page Block Channel] Create new channel success',
  props<{ channel: Channel }>()
);

export const createNewChannelErrorAction = createAction(
  '[Main Page Block Channel] Create new channel error'
);
