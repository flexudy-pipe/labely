import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImporterComponent } from '../common/importer/importer.component';
import { LabelyService } from '../services/labely.service';
import { Label } from '../models/label-model';

@Component({
  selector: 'labely-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public static ROUTE = 'home';

  labels: Label[] = [];
  constructor(private route: Router, private labelyService: LabelyService) {}

  ngOnInit(): void {}

  addLabel(label: Label) {
    this.labels.push(label);
  }

  confirm() {
    this.labelyService.clearLocalStorage();
    this.labelyService.setLabel(this.labels);
    this.route.navigate([ImporterComponent.ROUTE]);
  }
}
