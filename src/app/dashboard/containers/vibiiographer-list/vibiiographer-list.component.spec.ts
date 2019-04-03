import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VibiiographerListComponent } from './vibiiographer-list.component';

describe('VibiiographerListComponent', () => {
  let component: VibiiographerListComponent;
  let fixture: ComponentFixture<VibiiographerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VibiiographerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VibiiographerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
