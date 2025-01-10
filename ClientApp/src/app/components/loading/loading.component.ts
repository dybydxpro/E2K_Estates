import { Component, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit, OnDestroy {
  @ViewChild('loading-page') loadingPage!: ElementRef<HTMLElement>;
  opacity: number = 1;

  constructor() {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
  }
}
