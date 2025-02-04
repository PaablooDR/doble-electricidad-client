import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3333/users';
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  loginUser(userData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, userData);
  }

  createHeaders() {
    return {
      headers: new HttpHeaders ({
        'Authorization': localStorage.getItem('token_doble_electricidad')!
      })
    }
  }

  isLogged(): boolean {
    return localStorage.getItem('token_doble_electricidad') ? true : false;
  }

  // getUserId(email: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/userId/?email=${email}`);
  // }
}
