import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvComponent } from './csv/csv.component';
import { HomeComponent } from './home/home.component';
import { TextComponent } from './text/text.component';
import { RouteGuard } from './route.guard';
import { RoutingPath } from './models/routingPath';

const routes: Routes = [
  {
    path: RoutingPath.HOME,
    component: HomeComponent
  },
  {
    path: RoutingPath.CSV,
    component: CsvComponent,
    canActivate: [RouteGuard]
  },
  {
    path: RoutingPath.TEXT,
    component: TextComponent,
    canActivate: [RouteGuard]
  },
  {
    path: '**',
    redirectTo: RoutingPath.HOME
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule {}
