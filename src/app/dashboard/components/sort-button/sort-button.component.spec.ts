import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { SortButtonComponent } from './sort-button.component';

import { SortOptions } from '../../models/sort-options';
import { SortType } from '../../models/sort-type.interface';

describe('SortButtonComponent', () => {
  let component, fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        SortButtonComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortButtonComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });
});
