import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../auth/interfaces/auth.interfaces';
import { RegisterRequest, RegisterResponse } from '../../auth/interfaces/user.interface';
import { environment } from '../../../enviroments/environments';

const AUTH_URL: string = `${environment.urlBase}Auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('Intentando iniciar sesión...', credentials);
    return this.http
      .post<LoginResponse>(`${AUTH_URL}/login`, credentials)
      .pipe(
        tap(res => {
          console.log('llega...',res)
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
          if (res.role) {
            localStorage.setItem('role', res.role);
          }
        })
      );
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${AUTH_URL}/register`, payload);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
