import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Label } from '../models/label-model';
import { Consts } from '../models/Consts';

@Component({
  selector: 'labely-items-container',
  templateUrl: './items-container.component.html',
  styleUrls: ['./items-container.component.scss']
})
export class ItemsContainerComponent implements OnInit {
  @Input() items: Array<Map<string, string>>;
  @Input() labels: Label[];
  @Output() labelItem = new EventEmitter<any>();
  ID = Consts.ROW_INDEX;
  LABEL = Consts.YOUR_LABEL;

  constructor() {}

  ngOnInit(): void {}

  selectLabel(item, label: Label) {
    if (item.get(this.ID) === label.name) {
      return;
    }
    this.updateLabel(item, label.name);
  }

  private updateLabel(item, labelName): void {
    this.items.forEach(i => {
      if (i.get(this.ID) === item.get(this.ID)) {
        i.set(Consts.YOUR_LABEL, labelName);
        this.labelItem.emit(item);
      }
    });
  }
}
