import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { LoginModel } from '../models/LoginModel';

type AuthUser = any | null | undefined;
interface AuthState {
  user: AuthUser;
}

const initialState: AuthState = {
  user: null,
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000';

  state = signal<AuthState>(initialState);
  user = computed(() => this.state().user);

  setUserSignal(userData: any | null) {
    console.log(userData);
    this.state.update((data) => ({ user: userData }));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUserById(id: string) {
    return this.http
      .get(`${this.apiUrl}/users/${id}`, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError<any>('getUser', [])));
  }
}
