import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AnswerCallComponent } from './answer-call.component';

// Services & Resolvers
import { AnswerCallService } from './services/answer-call.service';
import { AnswerCallResolverService } from './services/answer-call-resolver.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AnswerCallComponent
  ],
  providers: [
    AnswerCallService,
    AnswerCallResolverService
  ]
})

export class AnswerCallModule { }
