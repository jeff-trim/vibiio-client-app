import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertSearchResultComponent } from './expert-search-result.component';

describe('ExpertSearchResultComponent', () => {
  let component: ExpertSearchResultComponent;
  let fixture: ComponentFixture<ExpertSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
