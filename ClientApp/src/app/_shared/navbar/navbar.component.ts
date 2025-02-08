import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Output() selectSeg: EventEmitter<string> = new EventEmitter<string>();
  @Output() startSession: EventEmitter<any> = new EventEmitter<any>();
  isOpenClearChatModule: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  openClearChatModule(): void {
    this.isOpenClearChatModule = true;
  }

  closeClearChatModule(): void {
    this.isOpenClearChatModule = false;
  }

  triggerSeg(seg: string): void {
    this.selectSeg.emit(seg);
  }

  newSession(): void {
    this.isOpenClearChatModule = false;
    this.startSession.emit();
  }
}
