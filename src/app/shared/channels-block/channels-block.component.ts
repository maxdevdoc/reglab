import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllChannels, getCurrentChannels } from './store/selector';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  changeChannel,
  createNewChannelAction,
  getAlleChannelAction,
} from './store/action';
import { Channel } from './store/state';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-channels-block',
  standalone: true,
  templateUrl: './channels-block.component.html',
  imports: [NgClass, AsyncPipe, FormsModule],
  styleUrls: ['./channels-block.component.css'],
})
export class ChannelsBlockComponent implements OnInit {
  currentIdChannel!: number;
  allChannels$?: Observable<Channel[]>;
  isModalOpen = false;
  newChannelName = '';
  isClosing = false;

  constructor(private store: Store) {
    this.store.dispatch(getAlleChannelAction());
  }

  ngOnInit() {
    this.store.select(getCurrentChannels).subscribe((data) => {
      this.currentIdChannel = data.id;
    });
    this.allChannels$ = this.store.select(getAllChannels);
  }

  isChannelSelected(channelId: number): boolean {
    return channelId == this.currentIdChannel;
  }

  changeChannel(channel: Channel) {
    const updatedChannel = { ...channel, id: Number(channel.id) };
    this.store.dispatch(changeChannel({ channel: updatedChannel }));
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isClosing = true;
    setTimeout(() => {
      this.isModalOpen = false;
      this.newChannelName = '';
      this.isClosing = false;
    }, 300);
  }

  addChannel() {
    if (this.newChannelName) {
      const newChannel: Channel = {
        id: Math.floor(Math.random() * 1000),
        name: this.newChannelName,
      };

      this.store.dispatch(createNewChannelAction({ channel: newChannel }));

      this.closeModal();
    }
  }
}
