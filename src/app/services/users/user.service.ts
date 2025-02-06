import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3333/users';
  constructor(private http: HttpClient) { }

  // Request to get all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Request to get the user who is logged
  getUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user`, this.createHeaders());
  }

  // Request of the login data
  loginUser(userData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, userData);
  }

  // Create a header for the requests
  createHeaders() {
    return {
      headers: new HttpHeaders ({
        'Authorization': localStorage.getItem('token_doble_electricidad')!
      })
    }
  }

  // Check if user is logged
  isLogged(): boolean {
    return localStorage.getItem('token_doble_electricidad') ? true : false;
  }

  // Request to edit an user
  editUser(userData: { name: string, email: string, password: string, address: string }) {
    return this.http.put<any>(`${this.baseUrl}/edit`, userData, this.createHeaders());
  }
}
