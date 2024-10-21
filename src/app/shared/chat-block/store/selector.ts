import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatStore } from './state';

export const selectChat = createFeatureSelector<ChatStore>('chat');

export const getLoadingChat = createSelector(
  selectChat,
  (channels: ChatStore) => channels.loading
);

export const allMessage = createSelector(
  selectChat,
  (message: ChatStore) => message.messages
);
