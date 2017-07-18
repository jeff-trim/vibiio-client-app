import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms'
import { DynamicFormComponent } from './dynamic-form.component';

// Stubs
import { inputConfig } from '../../testing/config.stub';

describe('DynamicFormComponent', () => {
    let comp: DynamicFormComponent;
    let fixture: ComponentFixture<DynamicFormComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule
        ],
        declarations: [
            DynamicFormComponent
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      }).compileComponents();
    }));

    beforeEach(() => {
       fixture = TestBed.createComponent(DynamicFormComponent);
       comp  = fixture.componentInstance;

       comp.config = inputConfig;
    });

    it('should be definded', async(() => expect(comp).toBeDefined() ));

    it('should create form controls', async(() => {
        comp.form = comp.createGroup();
 
        expect(comp.form.controls.county).toBeDefined();
        expect(comp.form.controls.name).toBeDefined();
        expect(comp.form.controls.submit).toBeDefined();
    }));

    it('should emit the form value', async(() => {
        const form = { name: 'bob', county: 'yum yun' };
        spyOn(comp.submitted, 'emit');

        comp.formSubmit(form);

        expect(comp.submitted.emit).toHaveBeenCalled();
        expect(comp.submitted.emit).toHaveBeenCalledWith(form);
    }));

});
