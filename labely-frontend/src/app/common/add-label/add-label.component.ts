import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'labely-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {
  @Output() addLabel: EventEmitter<any> = new EventEmitter();
  labelForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.labelForm = this.formBuilder.group({
      label: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.labelForm.invalid) {
      return;
    }
    this.addLabel.emit(this.labelForm.get('label').value);
    this.labelForm.reset();
  }
}
