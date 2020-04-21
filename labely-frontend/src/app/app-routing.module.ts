import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextComponent } from './text/text.component';
import { LabelComponent } from './label/label.component';
import { ImporterComponent } from './common/importer/importer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: LabelComponent.ROUTE
  },
  {
    path: LabelComponent.ROUTE,
    component: LabelComponent
  },
  {
    path: ImporterComponent.ROUTE,
    component: ImporterComponent
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
