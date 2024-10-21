import { User } from '../../../login-and-authorization/store/state';

export interface UsersStore {
  loading?: boolean;
  users: User[];
  userChannel: UserChannel[];
}

export const initialUsersState: UsersStore = {
  loading: true,
  users: [],
  userChannel: [
    {
      id: '0',
      channelId: "0",
    },
  ],
};

export interface UserChannel {
  id: string;
  channelId: string;
}
