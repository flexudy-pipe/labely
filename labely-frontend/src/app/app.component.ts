import { Component, OnInit } from '@angular/core';
import { PageConfig, PaginationConfigModel } from './models/pagination-config.model';
import { Papa } from 'ngx-papaparse';
import { LabelyService } from './services/labely.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'labely-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  result = [];
  data = [];
  config: PaginationConfigModel = {
    itemsPerPage: 10,
    currentPageNumber: 1,
    totalItems: 0
  };

  constructor(private papa: Papa, private formBuilder: FormBuilder, public labelyService: LabelyService) {}

  labelForm: FormGroup;
  labels = [];

  ngOnInit() {
    this.labelForm = this.formBuilder.group({
      label: ['', Validators.required]
    });
    this.pageChange(new PageConfig());
  }

  onSubmit() {
    if (this.labelForm.invalid) {
      return;
    }
    this.labels.push(this.labelForm.get('label').value);
    this.labelyService.setLabel(this.labels);
    this.labelForm.reset();
  }

  handleFileSelect(evt) {
    const files = evt.target.files; // FileList object
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      const csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: results => {
          this.data = results.data;
          this.config.totalItems = this.data.length;
          this.labelyService.setData(this.data);
          this.pageChange(new PageConfig());
        }
      });
    };
  }

  pageChange(pageConfig: PageConfig) {
    this.result = this.labelyService.getDataByPageSize(pageConfig.pageNumber, pageConfig.pageSize);
  }
}
