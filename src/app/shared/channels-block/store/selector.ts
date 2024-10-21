import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChannelsStore } from './state';

export const selectChannels = createFeatureSelector<ChannelsStore>('channels');

export const getLoadingChannels = createSelector(
  selectChannels,
  (channels: ChannelsStore) => channels.loading
);

export const getCurrentChannels = createSelector(
  selectChannels,
  (channels: ChannelsStore) => channels.currentChannels
);

export const getAllChannels = createSelector(
  selectChannels,
  (channels: ChannelsStore) => channels.allChannels
);
