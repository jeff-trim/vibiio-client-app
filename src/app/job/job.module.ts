import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { JobComponent } from './containers/job.component';

// Services
import { JobResolver } from './services/job.resolver.service';
import { JobService } from './services/job.service';

// Routes
const jobRoutes: Routes = [
  {
    path: 'jobs',
    component: JobComponent,
    resolve: { job: JobResolver }
  }
];

@NgModule({
  declarations: [
    JobComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(jobRoutes)
  ],
  exports: [
    JobComponent
  ],
  providers: [
    JobResolver,
    JobService
  ]
})

export class JobModule { };
