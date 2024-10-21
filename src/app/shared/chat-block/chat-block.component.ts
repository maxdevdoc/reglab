import { Component, OnInit, OnDestroy, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Channel, initialChannelsState } from '../channels-block/store/state';
import { getCurrentChannels } from '../channels-block/store/selector';
import {
  getAllUser,
  getCurrentUser,
} from '../../login-and-authorization/store/selector';
import {
  initialLoginAndAuthorizationState,
  User,
} from '../../login-and-authorization/store/state';
import { Message } from './store/state';
import { NgClass } from '@angular/common';
import {
  getMassageAction,
  sendMassageAction,
  setUserIsOnlineAction,
} from './store/action';
import { allMessage } from './store/selector';
import { toSignal } from '@angular/core/rxjs-interop';
import { effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-block',
  standalone: true,
  templateUrl: './chat-block.component.html',
  imports: [NgClass, FormsModule],
  styleUrls: ['./chat-block.component.css'],
})
export class ChatBlockComponent implements OnInit, OnDestroy {
  currentUser: Signal<User>;
  allUser: Signal<User[]>;
  currentChannel: Signal<Channel>;
  messages: Signal<Message[]>;
  filteredMessages = signal<Message[]>([]);
  textNewMessage!: string;
  newMessage!: Message;
  pollingInterval!: any;

  constructor(private store: Store) {
    this.currentUser = toSignal(this.store.select(getCurrentUser), {
      initialValue: initialLoginAndAuthorizationState.user,
    });
    this.currentChannel = toSignal(this.store.select(getCurrentChannels), {
      initialValue: initialChannelsState.currentChannels,
    });
    this.messages = toSignal(this.store.select(allMessage), {
      initialValue: [],
    });
    this.allUser = toSignal(this.store.select(getAllUser), {
      initialValue: [],
    });

    effect(
      () => {
        const user = this.currentUser();
        const channel = this.currentChannel();
        const allMessages = this.messages();

        if (user && channel) {
          this.filteredMessages.set(
            allMessages.filter((message) => message.channel_id === channel.id)
          );
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.store.dispatch(getMassageAction());
    this.store.dispatch(
      setUserIsOnlineAction({
        userId: String(this.currentUser().id),
        is_online: true,
      })
    );

    this.pollingInterval = setInterval(() => {
      this.store.dispatch(getMassageAction());
    }, 10000);
  }

  ngOnDestroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
    this.store.dispatch(
      setUserIsOnlineAction({
        userId: String(this.currentUser().id),
        is_online: false,
      })
    );
  }

  getUserNameById(userId: number): string {
    const user = this.allUser().find((u) => u.id == userId);
    return user ? user.userName : 'Unknown User';
  }

  sendMessage() {
    const lastMessage =
      this.filteredMessages().length > 0
        ? this.filteredMessages()[this.filteredMessages().length - 1]
        : null;

    const newMessageId = lastMessage ? Number(lastMessage.id) + 1 : 1;

    this.newMessage = {
      id: newMessageId,
      from_user: this.currentUser().id,
      channel_id: this.currentChannel().id,
      content: this.textNewMessage,
    };

    this.store.dispatch(sendMassageAction({ massage: this.newMessage }));
    this.textNewMessage = '';
  }
}
