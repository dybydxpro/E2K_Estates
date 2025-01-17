import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  isLoading: boolean = true;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.renderer.listen('window', 'load', ($event: any) => {
      this.isLoading = false;
    });
  }
}
