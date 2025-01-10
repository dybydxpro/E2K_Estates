import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormsModule, 
  ReactiveFormsModule
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { Message } from './../../models/message';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  AddMessage,
  UpdateMessage,
  DeleteMessage,
  DestroyMessages,
} from './../../../state-mgt/actions/message.action';
import { OpenAIService } from './../../services/open-ai.service';
import CryptoJS from 'crypto-js';
import { Msg } from './../../models/enum';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';
import { MsgBoxComponent } from './msg-box/msg-box.component';
import { ChatViewComponent } from './chat-view/chat-view.component';

@Component({
  selector: 'app-home',
  imports: [
    SharedModule, 
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MsgBoxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('homePage', { static: true }) homePage!: ElementRef;
  @ViewChild('pageBody', { static: true }) pageBody!: ElementRef;
  gptForm: UntypedFormGroup;
  messages: Message[] = [];
  questions: any[] = [];
  easyMsg: string | null = null;
  isLoading: boolean = false;
  isChatView: boolean = false;
  selectedConfig: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
    private openai: OpenAIService,
    private message: NzMessageService
  ) {
    this.store
      .select((state) => state.messageData.messageData)
      .subscribe((data: any) => {
        this.messages = data;

        if (this.messages.length !== 0) {
          this.isChatView = true;
        }
      });

    this.questions = [
      {
        id: 1,
        question:
          'I want an affordable, easy-to-drive car for my first vehicle',
        config: [
          { forcus: 'condition', value: 'Used' },
          { forcus: 'type', value: 'Hatchback' },
          { forcus: 'budget', value: 'Below $20,000' },
          { forcus: 'fuelType', value: 'Any fuel' },
        ],
      },
      {
        id: 2,
        question: "What's the best electric car under 40k?",
        config: [
          { forcus: 'fuelType', value: 'Electric' },
          { forcus: 'budget', value: '$20,000 - $40,000' },
        ],
      },
      {
        id: 3,
        question: 'What is the best daily small car for work commuting?',
        config: [
          { forcus: 'type', value: 'Hatchback' },
          { forcus: 'budget', value: '$20,000 - $40,000' },
          { forcus: 'fuelType', value: 'Hybrid' },
          { forcus: 'fuelType', value: 'Electric' },
          { forcus: 'seating', value: '4 seats' },
          { forcus: 'purpose', value: 'Daily commuting' },
        ],
      },
      {
        id: 4,
        question:
          'I need a spacious and safe SUV to accommodate my growing family and long road trips',
        config: [
          { forcus: 'type', value: 'SUV' },
          { forcus: 'purpose', value: 'Family activities & Road Trips' },
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.gptForm = this.fb.group({
      prompt: [null, [Validators.required]],
    });
  }

  selectSegment(native: string, e: string): void {
    let ele: any = this.pageBody.nativeElement.querySelector(`.${native}`);
    if (ele) {
      ele.scrollIntoView({ behavior: 'auto', block: e, inline: 'nearest' });
    }
  }

  triggerPrompt(e: any): void {
    this.easyMsg = e.toString();
    this.submitPrompt(this.easyMsg);
  }

  getHashKey(): string {
    return CryptoJS.SHA256(new Date().toTimeString()).toString();
  }

  submitPrompt(script: string | null = null): void {
    if (script !== null) {
      this.isLoading = true;
      let messages: Message = {
        id: this.getHashKey(),
        ownerType: Msg.User,
        text: script,
      };

      this.store.dispatch(new AddMessage(messages));
      this.resetForm();
      this.submitToGPT();
    } else if (script === null && this.gptForm.valid) {
      this.isLoading = true;
      const promptValue = this.gptForm.get('prompt')?.value;
      let messages: Message = {
        id: this.getHashKey(),
        ownerType: Msg.User,
        text: promptValue,
      };
      this.store.dispatch(new AddMessage(messages));
      this.resetForm();
      this.submitToGPT();
    } else {
      this.openSnackBar('Prompt is empty!');
    }
  }

  openSnackBar(message: string): void {
    this.message.create('warning', message, {
      nzDuration: 3000,
    });
  }

  submitToGPT(): void {
    this.openai.sendMessage(this.messages).subscribe(
      (res: any) => {
        this.responceToChat(Msg.System, JSON.stringify(res));
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        console.error(err);
      }
    );
  }

  responceToChat(ownerType: Msg, message: string): void {
    let messages: Message = {
      id: this.getHashKey(),
      ownerType: ownerType,
      text: message,
    };
    this.store.dispatch(new AddMessage(messages));
  }

  newSession(): void {
    this.store.dispatch(new DestroyMessages());
    this.isChatView = false;
    this.selectedConfig = [];
  }

  selectConfig(config: any[]): void {
    this.selectedConfig = config;
    this.isChatView = true;
  }

  stratJourney(): void {
    this.isChatView = true;
  }

  resetForm(): void {
    this.gptForm = this.fb.group({
      prompt: [null, [Validators.required]],
    });
  }
}
