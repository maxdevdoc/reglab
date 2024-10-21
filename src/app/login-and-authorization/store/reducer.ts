import { Action, createReducer, on } from '@ngrx/store';
import {
  initialLoginAndAuthorizationState,
  LoginAndAuthorizationStore,
  User,
} from './state';
import {
  getAllUserSuccessAction,
  navigationToLoginAction,
  navigationToRegistrationAction,
  setCurrentUserAction,
  userRegistrationSuccessAction,
} from './action';

const _loginAndAuthorizationReducer = createReducer(
  initialLoginAndAuthorizationState,

  on(getAllUserSuccessAction, (state, { users }) => ({
    ...state,
    allUsers: users,
  })),

  on(navigationToLoginAction, (state) => ({
    ...state,
    isLoginPage: true,
  })),

  on(userRegistrationSuccessAction, (state, { user }) => ({
    ...state,
    allUsers: [...state.allUsers, user],
  })),

  on(setCurrentUserAction, (state, { user }) => ({
    ...state,
    user: user,
  })),

  on(navigationToRegistrationAction, (state) => ({
    ...state,
    isLoginPage: false,
  }))
);

export function loginAndAuthorizationReducer(
  state: LoginAndAuthorizationStore | undefined,
  action: Action
) {
  return _loginAndAuthorizationReducer(state, action);
}
