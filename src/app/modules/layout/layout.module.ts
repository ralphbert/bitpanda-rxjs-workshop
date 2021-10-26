import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseLayoutComponent} from './components/base-layout/base-layout.component';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BaseLayoutComponent,],
  exports: [
    BaseLayoutComponent,
  ]
})
export class LayoutModule {
}
