import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvComponent } from './csv.component';

describe('ProjectsComponent', () => {
  let component: CsvComponent;
  let fixture: ComponentFixture<CsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CsvComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
