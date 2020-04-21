import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImporterComponent } from '../common/importer/importer.component';
import { LabelyService } from '../services/labely.service';

@Component({
  selector: 'labely-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  public static ROUTE = 'label';

  labels = [];
  constructor(private route: Router, private labelyService: LabelyService) {}

  ngOnInit(): void {}

  addLabel(labelName) {
    this.labels.push(labelName);
  }

  confirm() {
    this.labelyService.setLabel(this.labels);
    this.route.navigate([ImporterComponent.ROUTE]);
  }
}
