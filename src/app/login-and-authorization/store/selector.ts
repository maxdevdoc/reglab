import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginAndAuthorizationStore } from './state';

export const selectLoginAndAuthorization =
  createFeatureSelector<LoginAndAuthorizationStore>('loginAndAuthorization');

export const getCurrentUser = createSelector(
  selectLoginAndAuthorization,
  (currentUser: LoginAndAuthorizationStore) => currentUser.user
);

export const getCurrentUserName = createSelector(
  selectLoginAndAuthorization,
  (currentUser: LoginAndAuthorizationStore) => currentUser.user.userName
);

export const getAllUser = createSelector(
  selectLoginAndAuthorization,
  (state: LoginAndAuthorizationStore) => state.allUsers
);

export const getIsLoginPage = createSelector(
  selectLoginAndAuthorization,
  (state: LoginAndAuthorizationStore) => state.isLoginPage
);
