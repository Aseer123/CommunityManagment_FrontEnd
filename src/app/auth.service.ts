import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) { }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, userData, { responseType: 'text' })
      .pipe(
        tap((token: string) => {
          localStorage.setItem('token', token);
          const userRole = this.getUserRoleFromToken(token);
          localStorage.setItem('userRole', userRole);
        })
      );
  }

  // Add register method
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  getUserRoleFromToken(token: string): string {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.role || '';
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }

  validateToken(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/validate/token`, null, {
      params: { token },
      responseType: 'text'
    });
  }

  validateRole(token: string, role: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/validate/role`, {
      params: { token, role },
      responseType: 'text'
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }
}