import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Models
import { Job } from '../models/job.interface';

@Component({
  selector: 'app-job',
  template: `
    <a href="">
      <h2>Connect to video session</h2>
    </a>
    <p>Video Session ID:</p>
    <p>{{ job.video_session_id }}</p>
  `
})

export class JobComponent implements OnInit {
  job: Job;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe( (data: { job: Job }) => {
      this.job = data.job;
    });
  }
}
