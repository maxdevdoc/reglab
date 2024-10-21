import { Action, createReducer, on } from '@ngrx/store';
import { ChannelsStore, initialChannelsState } from './state';
import {
  changeChannel,
  createNewChannelSuccessAction,
  getAlleChannelSuccessAction,
} from './action';

const _channelsReducer = createReducer(
  initialChannelsState,

  on(changeChannel, (state, { channel }) => ({
    ...state,
    currentChannels: channel,
    loading: false,
  })),

  on(getAlleChannelSuccessAction, (state, { allChannel }) => ({
    ...state,
    allChannels: allChannel,
    loading: false,
  })),

  on(createNewChannelSuccessAction, (state, { channel }) => ({
    ...state,
    allChannels: [...state.allChannels, channel],
    loading: false,
  }))
);

export function channelsReducer(
  state: ChannelsStore | undefined,
  action: Action
) {
  return _channelsReducer(state, action);
}
