import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  HostListener,
  SimpleChanges,
} from '@angular/core';
import { SharedModule } from '../../../_shared/shared.module';
import { CommonModule } from '@angular/common';
import { SystemResponseViewComponent } from './system-response-view/system-response-view.component';
import { RequrementsFormComponent } from './requrements-form/requrements-form.component';

@Component({
  selector: 'app-chat-view',
  imports: [CommonModule, SharedModule, SystemResponseViewComponent, RequrementsFormComponent],
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss',
})
export class ChatViewComponent implements OnInit, OnChanges {
  @Input() messages: any[] = [];
  @Input() isLoading: boolean = false;
  @Input() config: any[] = [];
  @Output() submitPrompt: EventEmitter<string> = new EventEmitter();
  isViewForm: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.messages.length === 0) {
      this.isViewForm = true;
    } else {
      this.isViewForm = false;
    }
  }

  submit(val: string): void {
    this.submitPrompt.emit(val);
  }
}
