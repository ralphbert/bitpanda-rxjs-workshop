import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './pages/users/users.component';
import {UsersRoutingModule} from './users-routing.module';
import {UiModule} from '../../modules/ui/ui.module';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    UiModule,
  ]
})
export class UsersModule {
}
