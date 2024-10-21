import { Action, createReducer, on } from '@ngrx/store';
import { ChatStore, initialChatState } from './state';
import {
  getMassageErrorAction,
  getMassageSuccessAction,
  sendMassageSuccessAction,
} from './action';

const _chatReducer = createReducer(
  initialChatState,

  on(getMassageSuccessAction, (state, { massage }) => ({
    ...state,
    messages: massage,
  })),

  on(getMassageErrorAction, (state, { massage }) => ({
    ...state,
    error: massage,
  })),

  on(sendMassageSuccessAction, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  }))
);

export function chatReducer(state: ChatStore | undefined, action: Action) {
  return _chatReducer(state, action);
}
