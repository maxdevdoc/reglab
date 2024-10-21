import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { User } from '../login-and-authorization/store/state';
import { UserChannel } from '../shared/users-block/store/state';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrlUsers = 'http://localhost:3000/users';
  private apiUserChannel = 'http://localhost:3000/user_channels';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUsers);
  }

  getUserChannel(): Observable<UserChannel[]> {
    return this.http.get<UserChannel[]>(this.apiUserChannel);
  }

  addUserInChannel(
    usersChannel: { id: number; channelId: number }[]
  ): Observable<any[]> {
    const requests = usersChannel.map((userChannel) =>
      this.http.post<any>(this.apiUserChannel, userChannel)
    );
    return forkJoin(requests);
  }

  setUserOnline(userId: string, is_online: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrlUsers}/${userId}`, {
      is_online: is_online,
    });
  }
}
