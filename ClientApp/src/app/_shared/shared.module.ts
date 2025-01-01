import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModule } from './nz/nz.module';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [],
  imports: [
    NavbarComponent,
    CommonModule,
    NzModule,
  ],
  exports: [
    NzModule, 
    NavbarComponent,
  ],
})
export class SharedModule { }
