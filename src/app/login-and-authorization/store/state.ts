export interface LoginAndAuthorizationStore {
  loading?: boolean;
  isLoginPage?: boolean;
  user: User;
  allUsers: User[];
}

export interface User {
  id: number;
  userName: string;
  password?: string;
  is_online?: boolean;
}

export const initialLoginAndAuthorizationState: LoginAndAuthorizationStore = {
  loading: true,
  isLoginPage: true,
  user: {
    id: 0,
    userName: 'Error',
    is_online: true,
  },
  allUsers: [],
};
