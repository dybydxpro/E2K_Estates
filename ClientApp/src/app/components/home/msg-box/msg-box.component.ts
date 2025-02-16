import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { GlobalOutline, SendOutline, RightCircleFill } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons: IconDefinition[] = [
  GlobalOutline,
];

@Component({
  selector: 'app-msg-box',
  imports: [NzIconModule],
  templateUrl: './msg-box.component.html',
  styleUrl: './msg-box.component.scss'
})
export class MsgBoxComponent {
  @Input() data: any = {};
  @Output() trigger: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  submitPrompt(): void {
    this.trigger.emit(this.data.config);
  }
}
