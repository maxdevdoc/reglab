import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Channel } from '../shared/channels-block/store/state';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private apiUrlChannel = 'http://localhost:3000/channels';

  constructor(private http: HttpClient) {}

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.apiUrlChannel);
  }

  createNewChannels(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(this.apiUrlChannel, channel);
  }
}
