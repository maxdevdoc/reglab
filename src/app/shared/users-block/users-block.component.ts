import { Component, OnInit, signal, Signal, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllUsersAction, getUserChannelAction } from './store/action';
import { User } from '../../login-and-authorization/store/state';
import { getAllUsers, getUserChannel } from './store/selector';
import { initialUsersState, UserChannel } from './store/state';
import {JsonPipe, NgClass} from '@angular/common';
import { getCurrentChannels } from '../channels-block/store/selector';
import { Channel, initialChannelsState } from '../channels-block/store/state';
import { FormsModule } from '@angular/forms';
import { addUsersInChannelAction } from '../user-block/store/action';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users-block',
  standalone: true,
  imports: [NgClass, FormsModule, RouterLink, JsonPipe],
  templateUrl: './users-block.component.html',
  styleUrls: ['./users-block.component.css'],
})
export class UsersBlockComponent implements OnInit {
  allUsers: Signal<User[]>;
  userChannels: Signal<UserChannel[]>;
  currentChannel: Signal<Channel>;

  filteredUsers: Signal<User[]>;
  usersNotUseCurrentChannel: Signal<User[]>;
  selectedUserIds = signal<number[]>([]);
  isModalOpen = signal(false);
  isClosing = signal(false);

  constructor(private store: Store) {
    this.allUsers = toSignal(this.store.select(getAllUsers), {
      initialValue: [],
    });

    this.userChannels = toSignal(
      this.store.select(getUserChannel).pipe(
        map((userChannels) =>
          userChannels.length > 0 ? userChannels : initialUsersState.userChannel
        )
      ),
      {
        initialValue: initialUsersState.userChannel,
      }
    );

    this.currentChannel = toSignal(this.store.select(getCurrentChannels), {
      initialValue: initialChannelsState.currentChannels,
    });

    this.filteredUsers = computed(() => {
      const users = this.allUsers();
      const userChannels = this.userChannels();
      const currentChannel = this.currentChannel();

      if (
        users.length > 0 &&
        userChannels.length > 0 &&
        currentChannel?.id &&
        currentChannel.id !== 0
      ) {
        const filtered = users.filter((user) =>
          userChannels.some(
            (userChannel) =>
              Number(userChannel.id) === Number(user.id) &&
              Number(userChannel.channelId) === Number(currentChannel.id)
          )
        );
        return filtered;
      } else {
        return [];
      }
    });

    this.usersNotUseCurrentChannel = computed(() => {
      const users = this.allUsers();
      const userChannels = this.userChannels();
      const currentChannel = this.currentChannel();

      if (
        users.length > 0 &&
        userChannels.length > 0 &&
        currentChannel?.id &&
        currentChannel.id !== 0
      ) {
        const usersNotInChannel = users.filter(
          (user) =>
            !userChannels.some(
              (userChannel) =>
                Number(userChannel.id) === Number(user.id) &&
                Number(userChannel.channelId) === Number(currentChannel.id)
            )
        );
        return usersNotInChannel;
      } else {
        return [];
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(getAllUsersAction());
    this.store.dispatch(getUserChannelAction());
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  addSelectedUsers() {
    const currentChannelId = this.currentChannel().id;
    const selectedIds = this.selectedUserIds();

    const usersToAdd = selectedIds.map((userId) => ({
      id: userId,
      channelId: currentChannelId,
    }));

    this.store.dispatch(
      addUsersInChannelAction({ usersChannel: [...usersToAdd] })
    );

    this.closeModal();
  }

  closeModal() {
    this.isClosing.set(true);
    setTimeout(() => {
      this.isModalOpen.set(false);
      this.isClosing.set(false);
    }, 300);
  }

  onUserSelectionChange(userId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedUserIds.update((ids) => [...ids, userId]);
    } else {
      this.selectedUserIds.update((ids) => ids.filter((id) => id !== userId));
    }
  }
}




//////////////////////////////////Option on streams////////////////////////////////////////////
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { getAllUsersAction, getUserChannelAction } from './store/action';
// import { Observable, of, combineLatest, Subject } from 'rxjs';
// import { map, takeUntil } from 'rxjs/operators';
// import { User } from '../../login-and-authorization/store/state';
// import { getAllUsers, getUserChannel } from './store/selector';
// import { initialUsersState, UserChannel } from './store/state';
// import { AsyncPipe, NgClass } from '@angular/common';
// import { getCurrentChannels } from '../channels-block/store/selector';
// import { Channel, initialChannelsState } from '../channels-block/store/state';
// import { FormsModule } from '@angular/forms';
// import { addUsersInChannelAction } from '../user-block/store/action';
// import { RouterLink } from '@angular/router';
//
// @Component({
//   selector: 'app-users-block',
//   standalone: true,
//   imports: [AsyncPipe, NgClass, FormsModule, RouterLink],
//   templateUrl: './users-block.component.html',
//   styleUrls: ['./users-block.component.css'],
// })
// export class UsersBlockComponent implements OnInit, OnDestroy {
//   allUsers$: Observable<User[]> = of(initialUsersState.users);
//   userChannels$: Observable<UserChannel[]> = of(initialUsersState.userChannel);
//   currentChannels$: Observable<Channel> = of(
//     initialChannelsState.currentChannels
//   );
//   isModalOpen = false;
//   isClosing = false;
//
//   filteredUsers: User[] = [];
//   usersNotUseCurrentChannel: User[] = [];
//   selectedUserIds: number[] = [];
//
//   private destroy$ = new Subject<void>();
//
//   constructor(private store: Store) {
//     this.store.dispatch(getAllUsersAction());
//     this.store.dispatch(getUserChannelAction());
//
//     this.currentChannels$ = this.store.select(getCurrentChannels);
//     this.userChannels$ = this.store.select(getUserChannel);
//   }
//
//   openModal() {
//     this.isModalOpen = true;
//   }
//
//   addSelectedUsers() {
//     this.currentChannels$.pipe(takeUntil(this.destroy$)).subscribe((channel) => {
//       const currentChannelId = channel.id;
//
//       const usersToAdd = this.selectedUserIds.map((userId) => ({
//         id: userId,
//         channelId: currentChannelId,
//       }));
//
//       this.store.dispatch(
//         addUsersInChannelAction({ usersChannel: [...usersToAdd] })
//       );
//
//       this.store.dispatch(getAllUsersAction());
//       this.store.dispatch(getUserChannelAction());
//     });
//
//     this.closeModal();
//   }
//
//   closeModal() {
//     this.isClosing = true;
//     setTimeout(() => {
//       this.isModalOpen = false;
//       this.isClosing = false;
//     }, 300);
//   }
//
//   onUserSelectionChange(userId: number, event: Event) {
//     const isChecked = (event.target as HTMLInputElement).checked;
//     if (isChecked) {
//       this.selectedUserIds.push(userId);
//     } else {
//       this.selectedUserIds = this.selectedUserIds.filter((id) => id !== userId);
//     }
//   }
//
//   ngOnInit() {
//     this.allUsers$ = this.store.select(getAllUsers);
//     this.userChannels$ = this.store.select(getUserChannel);
//     this.currentChannels$ = this.store.select(getCurrentChannels);
//
//     combineLatest([this.allUsers$, this.userChannels$, this.currentChannels$])
//       .pipe(takeUntil(this.destroy$)) // Use takeUntil for automatic unsubscription
//       .pipe(
//         map(([users, userChannels, currentChannel]) => {
//           const filteredUsers = users.filter((user) => {
//             return userChannels.some((userChannel) => {
//               return (
//                 Number(userChannel.id) === Number(user.id) &&
//                 Number(userChannel.channelId) === Number(currentChannel.id)
//               );
//             });
//           });
//
//           const usersNotUseCurrentChannel = users.filter(
//             (user) =>
//               !userChannels.some(
//                 (userChannel) =>
//                   Number(userChannel.id) === Number(user.id) &&
//                   Number(userChannel.channelId) === Number(currentChannel.id)
//               )
//           );
//
//           return { filteredUsers, usersNotUseCurrentChannel };
//         })
//       )
//       .subscribe(({ filteredUsers, usersNotUseCurrentChannel }) => {
//         this.filteredUsers = filteredUsers;
//         this.usersNotUseCurrentChannel = usersNotUseCurrentChannel;
//       });
//   }
