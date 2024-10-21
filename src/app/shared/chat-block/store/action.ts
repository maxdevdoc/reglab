import { createAction, props } from '@ngrx/store';
import { Message } from './state';

////////////////////SEND-MESSAGE-CHAT////////////////////////////////////
export const sendMassageAction = createAction(
  '[Main Page API] Send massage',
  props<{ massage: Message }>()
);

export const sendMassageSuccessAction = createAction(
  '[Main Page API] Send massage success',
  props<{ message: Message }>()
);

export const sendMassageErrorAction = createAction(
  '[Main Page API] Send massage error',
  props<{ massage: any }>()
);
///////////////////GET-MESSAGE-CHAT/////////////////////////////////
export const getMassageAction = createAction('[Get message API] Send massage');

export const getMassageSuccessAction = createAction(
  '[Get message API] Send massage success',
  props<{ massage: Message[] }>()
);

export const getMassageErrorAction = createAction(
  '[Get message API] Send massage error',
  props<{ massage: any }>()
);

//////////////////SET-STATUS-USER////////////////////////////////////////
export const setUserIsOnlineAction = createAction(
  '[Main page chat block] Set User Is Online',
  props<{ userId: string; is_online: boolean }>()
);

export const setUserIsOnlineActionSuccess = createAction(
  '[Main page chat block] Set User Is Online Success',
  props<{ userId: string }>()
);

export const setUserIsOnlineActionError = createAction(
  '[Main page chat block] Set User Is Online Failure',
  props<{ error: any }>()
);
