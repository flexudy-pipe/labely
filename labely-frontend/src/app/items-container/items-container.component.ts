import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'labely-items-container',
  templateUrl: './items-container.component.html',
  styleUrls: ['./items-container.component.scss']
})
export class ItemsContainerComponent implements OnInit {
  @Input() items = new Array<Map<string, string>>();
  @Input() labels = [];

  constructor() {}

  ngOnInit(): void {}

  selectLabel(item, label) {
    console.log('item, label', item, label);
  }
}
