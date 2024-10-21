export interface ChannelsStore {
  loading?: boolean;
  allChannels: Channel[];
  currentChannels: Channel;
}

export const initialChannelsState: ChannelsStore = {
  loading: true,
  allChannels: [],
  currentChannels: {
    id: 0,
    name: '',
  },
};

export interface Channel {
  id: number;
  name: string;
}
