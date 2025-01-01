import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Output() selectSeg: EventEmitter<string> = new EventEmitter<string>();
  @Output() startSession: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  triggerSeg(seg: string): void {
    this.selectSeg.emit(seg);
  }

  newSession(): void {
    this.startSession.emit();
  }
}
