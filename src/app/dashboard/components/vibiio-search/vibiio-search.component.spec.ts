import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VibiioSearchComponent } from './vibiio-search.component';

describe('VibiioSearchComponent', () => {
  let component: VibiioSearchComponent;
  let fixture: ComponentFixture<VibiioSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VibiioSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VibiioSearchComponent);
    component = fixture.componentInstance;
    spyOn(component.queryEmitter, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the search term to the parent component', () => {
    component.query.nativeElement.value = 'term';
    component.search();

    expect(component.queryEmitter).toHaveBeenCalledWith('term');
  });
});
