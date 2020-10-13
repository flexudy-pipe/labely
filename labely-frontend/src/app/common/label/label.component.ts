import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Label } from '../../models/label-model';

@Component({
  selector: 'labely-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  @Input() labels: Array<Label>;
  @Input() activeLabel: Label;
  @Output() activeLabelEmitter = new EventEmitter<Label>();

  constructor() {}

  ngOnInit(): void {}

  selectLabel(label: Label): void {
    this.activeLabelEmitter.emit(label);
  }
}
