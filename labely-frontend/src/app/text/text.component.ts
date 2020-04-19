import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LabelyService } from '../services/labely.service';

@Component({
  selector: 'labely-projects',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, OnChanges {
  public static ROUTE = 'text-labely';

  items = new Array<Map<string, string>>();
  labels = [];

  @Input() data = [];

  constructor(private labelyService: LabelyService) {}

  ngOnInit(): void {
    this.labels = this.labelyService.getLabels();
  }

  selectLabel(item, label) {
    console.log('label', item, label);
  }

  ngOnChanges(): void {
    this.dataToMap(this.data);
  }

  clearStorage(item: string) {
    this.labelyService.clearLocalStorage(item);
    window.location.reload();
  }

  private dataToMap(data) {
    this.items = [];
    data.forEach(d => {
      const map = new Map<string, string>();
      // tslint:disable-next-line:forin
      for (const n in d) {
        map.set(n, d[n]);
      }
      this.items.push(map);
    });
  }
}
