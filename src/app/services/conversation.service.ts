import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { LoginModel } from '../models/LoginModel';

export interface IUserPart {
  id: string;
  first_name: string;
  last_name: string;
}

export interface IParticipant {
  id: string;
  user: IUserPart;
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
  private conversation = new Subject();

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/';

  get refetch() {
    return this.conversation.asObservable();
  }

  getConversations(): Observable<IConversation[]> {
    return this.http.get<IConversation[]>(`${this.apiUrl}conversation/`);
  }

  storeConversation(profileId: string): Observable<IConversation> {
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
    return this.http.post<IConversation[]>(
      `${this.apiUrl}conversation/messages/`,
      {
        content: newMessage.value.message,
        cid: cid,
      }
    );
  }
}
