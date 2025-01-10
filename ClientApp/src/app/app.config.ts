import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { MessageState } from './../state-mgt/states/message.state';
import { HttpClientModule } from '@angular/common/http';
import { IconDefinition } from '@ant-design/icons-angular';
import { GlobalOutline, SendOutline, RightCircleFill } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons: IconDefinition[] = [
  GlobalOutline,
  SendOutline,
  RightCircleFill
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      NgxsModule.forRoot([MessageState]),
      NgxsStoragePluginModule.forRoot({ keys: '*' }),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      HttpClientModule,
      NzIconModule.forRoot(icons),
      // NgxsLoggerPluginModule.forRoot(),
    ),
  ]
};
