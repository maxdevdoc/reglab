import { Action, createReducer, on } from '@ngrx/store';
import { UsersStore, initialUsersState } from './state';
import {
  clearStateUserChannelAction,
  getAlleUsersSuccessAction, getUserChannelAction,
  getUserChannelSuccessAction,
} from './action';
import {state} from "@angular/animations";
import {addUsersInChannelAction, addUsersInChannelSuccessAction} from "../../user-block/store/action";

const _friendsReducer = createReducer(
  initialUsersState,

  on(getAlleUsersSuccessAction, (state, { allUsers }) => ({
    ...state,
    users: allUsers,
    loading: false,
  })),


  on(getUserChannelAction, (state) => ({
  ...state,
  loading: false,
  })),



  on(getUserChannelSuccessAction, (state, { userChannel }) => ({
    ...state,
    userChannel: [...userChannel],
    loading: false,
  })),



  on(addUsersInChannelSuccessAction, (state, { userChannel }) => ({
    ...state,
    userChannel: [...state.userChannel, ...userChannel],
    loading: false,
  }))

)


export function friendsReducer(state: UsersStore | undefined, action: Action) {
  return _friendsReducer(state, action);
}
