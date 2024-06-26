import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { IUser } from './user.service';
import { API_URL } from '../data/constants';

export interface IParticipant {
  id: string;
  user: IUser;
}

export interface IMessagePartUser {
  id: string;
}

export interface IMessageParticipant {
  user_id: string;
  id: string;
  user: IMessagePartUser;
}

export interface IMessage {
  id: string;
  content: string;
  participant: IMessageParticipant;
}

export interface IConversation {
  id: string;
  title: string;
  is_group: boolean;
  profile_id: string | null;
  last_message: IMessage;

  participants: IParticipant[];
  messages: IMessage[];
}

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private refetchConversationSubject = new BehaviorSubject(null);

  private http = inject(HttpClient);
  private apiUrl = API_URL;

  get refetchConversation() {
    return this.refetchConversationSubject.asObservable();
  }

  getConversations(): Observable<IConversation[]> {
    return this.http.get<IConversation[]>(`${this.apiUrl}conversation/`);
  }

  createConversation(profileId: string): Observable<IConversation> {
    return this.http.post<IConversation>(`${this.apiUrl}conversation/`, {
      profile_id: profileId,
    });
  }

  showConversation(conversationId: string) {
    return this.http.get<IConversation>(
      `${this.apiUrl}conversation/${conversationId}`
    );
  }

  sendMessage(newMessage: any, cid: string | null) {
    return this.http
      .post<IConversation[]>(`${this.apiUrl}conversation/messages/`, {
        content: newMessage.value.message,
        cid: cid,
      })
      .pipe(tap(() => this.refetchConversationSubject.next(null)));
  }
}
