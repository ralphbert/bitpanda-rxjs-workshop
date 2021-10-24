import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    BaseLayoutComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ],
  exports: [
    BaseLayoutComponent
  ]
})
export class LayoutModule { }
