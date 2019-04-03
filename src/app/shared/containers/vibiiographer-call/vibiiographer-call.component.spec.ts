import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VibiiographerCallComponent } from './vibiiographer-call.component';

describe('VibiiographerCallComponent', () => {
  let component: VibiiographerCallComponent;
  let fixture: ComponentFixture<VibiiographerCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VibiiographerCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VibiiographerCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
