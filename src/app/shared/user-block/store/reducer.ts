import { Action, createReducer, on } from '@ngrx/store';
import { initialUserState, UserStore } from './state';

const _userReducer = createReducer(
  initialUserState,
);

export function userReducer(state: UserStore | undefined, action: Action): UserStore {
  return _userReducer(state, action);
}
