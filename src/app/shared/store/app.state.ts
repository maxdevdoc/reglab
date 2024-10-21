import { ChannelsStore } from '../channels-block/store/state';
import { UsersStore } from '../users-block/store/state';
import { UserStore } from '../user-block/store/state';
import { ChatStore } from '../chat-block/store/state';
import { LoginAndAuthorizationStore } from '../../login-and-authorization/store/state';

export interface AppState {
  channels: ChannelsStore;
  user: UserStore;
  users: UsersStore;
  chat: ChatStore;
  loginAndAuthorization: LoginAndAuthorizationStore;
}
