import { ActionReducerMap } from '@ngrx/store';
import { channelsReducer } from '../channels-block/store/reducer';
import { AppState } from './app.state';
import { userReducer } from '../user-block/store/reducer';
import { friendsReducer } from '../users-block/store/reducer';
import { chatReducer } from '../chat-block/store/reducer';
import { loginAndAuthorizationReducer } from '../../login-and-authorization/store/reducer';

export const reducers: ActionReducerMap<AppState> = {
  channels: channelsReducer,
  user: userReducer,
  users: friendsReducer,
  chat: chatReducer,
  loginAndAuthorization: loginAndAuthorizationReducer,
};
