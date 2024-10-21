import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserStore } from './state';

export const selectUser = createFeatureSelector<UserStore>('user');

export const getUserAction = createSelector(
  selectUser,
  (user: UserStore) => user.loading
);
