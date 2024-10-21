import { createAction, props } from '@ngrx/store';
import { UserChannel } from '../../users-block/store/state';

////////////////////GET-DATA-USER////////////////////////////////////
export const navigationToUserPageAction = createAction(
  '[Main Page block user] Go to user page'
);

///////////////////ADD-USER-IN-CHAT//////////////////////////////////
export const addUsersInChannelAction = createAction(
  '[Main Page block user] Add user in channel',
  props<{ usersChannel: any}>()
);

export const addUsersInChannelSuccessAction = createAction(
  '[Main Page block user] Add user in channel success',
  props<{userChannel: any}>()
);

export const addUsersInChannelErrorAction = createAction(
  '[Main Page block user] Add user in channel error'
);
