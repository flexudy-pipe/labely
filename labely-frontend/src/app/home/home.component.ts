import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabelyService } from '../services/labely.service';
import { Label } from '../models/label-model';
import { RoutingPath } from '../models/routingPath';

@Component({
  selector: 'labely-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  labels: Label[] = [];
  isDataPresent = true;
  isLabelPresent = true;

  constructor(private route: Router, private labelyService: LabelyService) {}

  ngOnInit(): void {
    this.labels = this.labelyService.getLabels();
  }

  addLabel(label: Label): void {
    if (!this.isPresent(label)) {
      this.labels.push(label);
      this.isLabelPresent = true;
      this.isDataPresent = this.labelyService.isDataPresent();
    }
  }

  onConfirm(id?: number): void {
    this.labelyService.setLabel(this.labels);
    this.isLabelPresent = this.labelyService.isLabelPresent();
    this.getOrUpdateDataStatus();

    if (id === 0) {
      this.toTextClassification();
    } else {
      this.toTextAnnotation();
    }
  }

  toTextClassification(): void {
    this.route.navigate([RoutingPath.CSV]);
  }

  toTextAnnotation(): void {
    this.route.navigate([RoutingPath.TEXT]);
  }

  onRemoveLabel(name: string) {
    this.labels = this.labels.filter(label => label.name !== name);
    this.labelyService.removeLabelByName(name);
  }

  getOrUpdateDataStatus(status?: boolean) {
    if (status) {
      this.isDataPresent = status;
    } else {
      this.isDataPresent = this.labelyService.isDataPresent();
    }
  }

  private isPresent(label: Label): boolean {
    return !!this.labels.find(l => l.name.toLowerCase() === label.name.toLowerCase());
  }
}
