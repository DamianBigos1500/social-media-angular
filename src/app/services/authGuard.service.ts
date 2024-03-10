import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
