import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LabelyService } from '../services/labely.service';
import { PageConfig, PaginationConfigModel } from '../models/pagination-config.model';
import { ImporterComponent } from '../common/importer/importer.component';

@Component({
  selector: 'labely-projects',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  public static ROUTE = 'text-labely';

  data = new Array<Map<string, string>>();
  labels = [];

  config: PaginationConfigModel = {
    itemsPerPage: 10,
    currentPageNumber: 1,
    totalItems: 0
  };

  constructor(private location: Location, private route: Router, private labelyService: LabelyService) {}

  ngOnInit(): void {
    this.labels = this.labelyService.getLabels();
    this.config.totalItems = this.labelyService.getData().length;
  }

  clearStorage(item: string) {
    this.labelyService.clearLocalStorage(item);
    this.location.back();
  }

  private dataToMap(data) {
    this.data = [];
    data.forEach(d => {
      const map = new Map<string, string>();
      // tslint:disable-next-line:forin
      for (const n in d) {
        map.set(n, d[n]);
      }
      this.data.push(map);
    });
  }

  private pageChange(pageConfig: PageConfig) {
    const result = this.labelyService.getDataByPageSize(pageConfig.pageNumber, pageConfig.pageSize);
    this.dataToMap(result);
  }
}
