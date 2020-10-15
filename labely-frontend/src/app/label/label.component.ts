import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImporterComponent } from '../common/importer/importer.component';
import { LabelyService } from '../services/labely.service';
import { Label } from '../models/label-model';

@Component({
  selector: 'labely-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  public static ROUTE = 'label';

  labels: Label[] = [];

  constructor(private route: Router, private labelyService: LabelyService) {}

  ngOnInit(): void {}

  addLabel(label: Label) {
    this.labels.push(label);
  }

  confirm() {
    this.labels = this.removeDuplicateLabels();
    this.labelyService.setLabel(this.labels);
    this.labelyService.clearLocalStorage();
    this.route.navigate([ImporterComponent.ROUTE]);
  }

  private removeDuplicateLabels(): Label[] {
    const labelSet = new Set();
    return this.labels.filter(item =>
      !labelSet.has(JSON.stringify(item)) ? labelSet.add(JSON.stringify(item)) : false
    );
  }
}
