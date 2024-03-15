import { AuthService } from './../../services/auth.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ConversationService,
  IConversation,
  IParticipant,
} from '../../services/conversation.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { mergeMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IMAGE_SRC } from '../../data/constants';
import { DropdownComponent } from '../../components/UI/dropdown/dropdown.component';

@Component({
  selector: 'app-conversation',
  standalone: true,
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DropdownComponent,
  ],
})
export class ConversationComponent implements OnInit {
  IMAGE_SRC: string = IMAGE_SRC;

  private ws: any;
  public user: any;
  public conversations: IConversation[] | [] = [];
  public conversationId: string | null = null;
  public selectedConversation: IConversation | null = null;

  @ViewChild('chatComponent') private chatComponentContainer?: ElementRef;

  constructor(
    private conversationService: ConversationService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
   
  }

  newMessageForm = this.formBuilder.group({
    message: ['', Validators.required],
  });

  ngOnInit(): void {
    this.authService.getUser$().subscribe((user) => {
      this.user = user;

      this.ws = new WebSocket(`ws://localhost:8000/ws/${1}`);
      this.ws.onmessage = (event: any) => {
        this.finalizeSendMessage();
      };
      this.getAllConversations();

      this.route.params.subscribe((params) => {
        this.conversationId = params['id'];
        if (this.conversationId) {
          this.showConversation(this.conversationId);
        }
      });
    });
  }

  getAllConversations() {
    this.conversationService.getConversations().subscribe({
      next: (conversations) => {
        this.conversations = conversations;
      },
    });
  }

  showConversation(conversationId: string) {
    this.conversationService.showConversation(conversationId).subscribe({
      next: (selectedConversation) => {
        this.selectedConversation = selectedConversation;
        this.scrollToBottom();
      },
    });
  }

  submitMessageForm() {
    if (!this.newMessageForm.valid) {
      console.log('Cannot send message because validation failed');
      return;
    }
    this.ws.send('input');

    const sendMessage$ = this.selectedConversation
      ? this.conversationService.sendMessage(
          this.newMessageForm,
          this.conversationId
        )
      : this.conversationService
          .storeConversation(this.conversationId as string)
          .pipe(
            mergeMap((selConv) => {
              this.selectedConversation = selConv;
              return this.conversationService.sendMessage(
                this.newMessageForm,
                this.conversationId
              );
            })
          );

    sendMessage$.subscribe(() => {
      this.scrollToBottom();
      this.newMessageForm.reset();
    });
  }

  finalizeSendMessage() {
    this.getAllConversations();
    this.showConversation(this.conversationId as string);
  }

  getConversationTitle(conversation: IConversation): string {
    if (conversation.title) {
      return conversation.title;
    } else {
      const username: IParticipant | undefined = conversation.participants.find(
        (participant: IParticipant) =>
          participant.user.id == conversation.profile_id
      );
      return `${username?.user.first_name} ${username?.user.last_name}`;
    }
  }

  deleteMessage(messageId: string) {
    console.log(messageId);
  }

  scrollToBottom() {
    this.chatComponentContainer!.nativeElement.scrollTop =
      this.chatComponentContainer?.nativeElement.scrollHeight ;
  }
}
