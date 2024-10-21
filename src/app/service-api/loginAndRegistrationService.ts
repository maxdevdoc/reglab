import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAndRegistrationService {
  private apiUrlUser = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUser);
  }
  registrationUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrlUser, user).pipe();
  }
}
