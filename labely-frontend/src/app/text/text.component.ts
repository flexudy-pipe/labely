import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LabelyService } from '../services/labely.service';
import { PageConfig, PaginationConfigModel } from '../models/pagination-config.model';
import { Consts } from '../models/Consts';
import { ImporterComponent } from '../common/importer/importer.component';

@Component({
  selector: 'labely-text',
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

  clearStorage() {
    this.labelyService.clearLocalStorage();
    this.route.navigate(['/']);
  }

  private convertJSONToMAP(data) {
    this.data = this.labelyService.convertJSONToMAP(data);
  }

  public pageChange(pageConfig: PageConfig) {
    const result = this.labelyService.getDataByPageSize(pageConfig.pageNumber, pageConfig.pageSize);
    this.convertJSONToMAP(result);
  }

  public labelItem(item): void {
    console.log(item);
    this.labelyService.updateItemLabel(item);
  }

  public download(): void {
    const data = this.labelyService.getData();
    data.forEach(d => delete d[Consts.ROW_INDEX]);
    console.log(JSON.stringify(data));

    this.labelyService.downloadFile(data, Consts.DOWNLOADED_FILE_NAME);
  }
}
