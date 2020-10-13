import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LabelyService } from './services/labely.service';
import { RoutingPath } from './models/routingPath';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private labelyService: LabelyService, private router: Router) {}

  canActivate(): boolean {
    const activate = this.labelyService.isLabelPresent() && this.labelyService.isDataPresent();
    if (!activate) {
      this.router.navigate([RoutingPath.HOME]);
    }
    return activate;
  }
}
