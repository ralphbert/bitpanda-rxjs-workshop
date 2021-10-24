import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseLayoutComponent} from './modules/layout/components/base-layout/base-layout.component';

const routes: Routes = [{
  path: '',
  component: BaseLayoutComponent,
  children: [{
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  }, {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
