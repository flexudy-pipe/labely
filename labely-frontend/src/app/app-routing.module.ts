import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvComponent } from './csv/csv.component';
import { HomeComponent } from './home/home.component';
import { ImporterComponent } from './common/importer/importer.component';
import { TextComponent } from './text/text.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HomeComponent.ROUTE
  },
  {
    path: HomeComponent.ROUTE,
    component: HomeComponent
  },
  {
    path: ImporterComponent.ROUTE,
    component: ImporterComponent
  },
  {
    path: CsvComponent.ROUTE,
    component: CsvComponent
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
