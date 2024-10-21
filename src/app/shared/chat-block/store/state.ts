export interface ChatStore {
  loading?: boolean;
  messages: Message[];
}

export interface Message {
  id: number;
  from_user: number;
  channel_id: number;
  content: string;
}

export const initialChatState: ChatStore = {
  loading: true,
  messages: [],
};
