import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextComponent } from './text/text.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: TextComponent.ROUTE
  },
  {
    path: TextComponent.ROUTE,
    component: TextComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
