import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Label } from '../models/label-model';

@Component({
  selector: 'labely-items-container',
  templateUrl: './items-container.component.html',
  styleUrls: ['./items-container.component.scss']
})
export class ItemsContainerComponent implements OnInit {
  @Input() items: Array<Map<string, string>>;
  @Input() labels: Label[];
  @Output() labelItem = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  selectLabel(item, label: Label) {
    if (item.get('id') === label.name) {
      return;
    }
    this.updateLabel(item, label.name);
  }

  private updateLabel(item, labelName): void {
    this.items.forEach(i => {
      if (i.get('id') === item.get('id')) {
        i.set('label', labelName);
        this.labelItem.emit(item);
      }
    });
  }
}
