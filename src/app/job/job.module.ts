import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Containers
import { JobComponent } from './containers/job.component';

@NgModule({
  declarations: [
    JobComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    JobComponent
  ],
  providers: []
})

export class JobModule { };
