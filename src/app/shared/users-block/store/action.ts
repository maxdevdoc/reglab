import { createAction, props } from '@ngrx/store';
import { User } from '../../../login-and-authorization/store/state';
import { UserChannel } from './state';

////////////////////GET-DATA-USERS////////////////////////////////////
export const getAllUsersAction = createAction(
  '[Main Page block users] Get all users'
);

export const getAlleUsersSuccessAction = createAction(
  '[Main Page block users] Get all users success',
  props<{ allUsers: User[] }>()
);

export const getAlleUsersErrorAction = createAction(
  '[Main Page block users] Get all users error'
);

////////////////////GET-USER-CHANNEL////////////////////////////////////
export const getUserChannelAction = createAction(
  '[Main Page block users] Get all user channel'
);

export const getUserChannelSuccessAction = createAction(
  '[Main Page block users] Get all user channel success',
  props<{ userChannel: UserChannel[] }>()
);

export const getUserChannelErrorAction = createAction(
  '[Main Page block users] Get all user channel error'
);
////////////////////////////////////////////////////////////////////////////
export const clearStateUserChannelAction = createAction(
  '[Main Page block users] clear state'
)
