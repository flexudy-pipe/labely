import { Component, OnInit } from '@angular/core';

import { Papa } from 'ngx-papaparse';
import { LabelyService } from '../../services/labely.service';

@Component({
  selector: 'labely-import',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {
  message: string;
  status = false;

  constructor(private papa: Papa, private labelyService: LabelyService) {}

  ngOnInit(): void {}

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
          this.status = this.labelyService.setData(results.data);
          if (this.status) {
            this.message = 'File was successfully imported';
          }
        }
      });
    };
  }
}
