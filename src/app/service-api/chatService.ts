import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../shared/chat-block/store/state';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrlMessages = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrlMessages);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrlMessages, message);
  }
}
