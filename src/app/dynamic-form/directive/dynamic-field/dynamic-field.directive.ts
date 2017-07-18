import { ComponentFactoryResolver, ViewContainerRef, Directive, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Config } from '../../models/config.interface';

import { FormInputComponent } from '../../components/form-input/form-input.component';
import { FormSelectComponent } from '../../components/form-select/form-select.component';
import { FormButtonComponent } from '../../components/form-button/form-button.component';

const components = {
         button: FormButtonComponent,
         input: FormInputComponent,
         select: FormSelectComponent
        };

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicField]' })
export class DynamicFieldDirective implements OnInit {
    component: any;

    @Input()
    config: Config;

    @Input()
    group: FormGroup;

    constructor ( private resolver: ComponentFactoryResolver,
                  private viewContainer: ViewContainerRef ) { }

    ngOnInit() {
       const component = components[this.config.type];
       // pass to factory
       const factory = this.resolver.resolveComponentFactory<any>(component);
       // create component instance
       this.component = this.viewContainer.createComponent(factory);
       this.component.instance.config = this.config;
       this.component.instance.group = this.group;
    }
}