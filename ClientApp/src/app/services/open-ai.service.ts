import { Injectable, isDevMode, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from './../models/message';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if(isPlatformBrowser(this.platformId)) {
      if(window.location.origin === "http://localhost:4200") {
        this.baseUrl = environment.ApiUrl + "/api/OpenAI";
      } else {
        this.baseUrl = window.location.origin + "/api/OpenAI";
      }
    }
  }

  sendMessage(messages?: Message[]): Observable<any> {
    return this.http.post<any>(this.baseUrl, messages);
  }

  responseSanitizer(message: string): string {
    let isOpeningTag = true;
    return message.replace(/\*\*/g, (match: any) => {
      if (isOpeningTag) {
        isOpeningTag = false;
        return '<strong>';
      } else {
        isOpeningTag = true;
        return '</strong>';
      }
    });
  }
}
