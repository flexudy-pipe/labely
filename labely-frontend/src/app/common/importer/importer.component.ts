import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Papa } from 'ngx-papaparse';
import { LabelyService } from '../../services/labely.service';
import { TextComponent } from '../../text/text.component';

@Component({
  selector: 'labely-import',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {
  public static ROUTE = 'import';

  constructor(private papa: Papa, private labelyService: LabelyService, private route: Router) {}

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
          this.labelyService.setData(results.data);
          this.route.navigate([TextComponent.ROUTE]);
        }
      });
    };
  }
}
