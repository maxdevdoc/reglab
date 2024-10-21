import { createAction, props } from '@ngrx/store';
import { User } from './state';

export const loginErrorInvalidDataAction = createAction(
  '[Login ang Registration] Invalid data'
);

export const userLoginSuccessAction = createAction(
  '[Login ang Registration] login success',
  props<{ user: User }>()
);

export const userLogOutAction = createAction(
  '[Login ang Registration] User logout'
);

export const registrationErrorInvalidDataAction = createAction(
  '[Login ang Registration] Registration invalid data'
);

export const userRegistrationAction = createAction(
  '[Login ang Registration] User registration',
  props<{ user: any }>()
);

export const userRegistrationSuccessAction = createAction(
  '[Login ang Registration] User registration success',
  props<{ user: User }>()
);

export const userRegistrationErrorAction = createAction(
  '[Login ang Registration] User registration error'
);

export const setCurrentUserAction = createAction(
  '[Login and Registration] Set current user',
  props<{ user: User }>()
);

//////////////////////////NAVIGATION////////////////////////////////////
export const navigationToRegistrationAction = createAction(
  '[Login ang Registration] Navigation to registration page'
);

export const navigationToLoginAction = createAction(
  '[Login and Registration] Navigation to login page'
);
///////////////////////////////GET-ALL-USER///////////////////////////////
export const getAllUserAction = createAction(
  '[Login and Registration] Get all users'
);

export const getAllUserSuccessAction = createAction(
  '[Login and Registration] Get all users success',
  props<{ users: User[] }>()
);

export const getAllUserErrorAction = createAction(
  '[Login and Registration] Get all users error'
);
///////////////////////////////
