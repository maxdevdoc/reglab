import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersStore } from './state';

export const selectUsers = createFeatureSelector<UsersStore>('users');

export const getUsersLoading = createSelector(
  selectUsers,
  (state: UsersStore) => state.loading
);

export const getAllUsers = createSelector(
  selectUsers,
  (state: UsersStore) => state.users
);

export const getUserChannel = createSelector(
  selectUsers,
  (state: UsersStore) => state.userChannel
);
