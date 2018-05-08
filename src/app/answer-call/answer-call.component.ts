import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vib-answer-call',
  templateUrl: './answer-call.component.html',
  styleUrls: ['./answer-call.component.scss']
})
export class AnswerCallComponent implements OnInit {
  token: string;
  session: any;
  subscriber: any;
  publisher: any;
  callData: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.callData = data.callData;
    });
    console.log(this.callData);
  }

  connectCall() {
    // check if vibiio call token is good
    // if true:
    // get auth token
    // get vibiio session id
    // connect to session
  }

}
