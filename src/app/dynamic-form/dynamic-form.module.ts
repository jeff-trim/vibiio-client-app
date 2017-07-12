import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormButtonComponent } from './components/form-button/form-button.component';

// Directives
import { DynamicFieldDirective } from './directive/dynamic-field/dynamic-field.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormComponent,
    FormInputComponent,
    FormButtonComponent,
    FormSelectComponent, 
    DynamicFieldDirective
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormInputComponent,
    FormButtonComponent,
    FormSelectComponent
  ]
})
export class DynamicFormModule {}
