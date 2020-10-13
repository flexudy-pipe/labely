import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Label } from '../../models/label-model';
import { LabelyService } from '../../services/labely.service';

@Component({
  selector: 'labely-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {
  @Output() addLabel: EventEmitter<any> = new EventEmitter();
  labelForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private labelyService: LabelyService) {}

  ngOnInit(): void {
    this.labelForm = this.formBuilder.group({
      label: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.labelForm.invalid) {
      return;
    }
    const label: Label = {
      name: this.labelForm.get('label').value,
      selected: false
    };
    this.addLabel.emit(label);
    this.labelForm.reset();
  }

  onDiscard(): void {
    this.labelyService.clearLocalStorage('labels');
  }
}
