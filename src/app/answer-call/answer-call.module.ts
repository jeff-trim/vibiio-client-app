import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AnswerCallComponent } from './answer-call.component';

// Services & Resolvers
import { AnswerCallResolverService } from './services/answer-call-resolver.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AnswerCallComponent
  ],
  providers: [
    AnswerCallResolverService
  ]
})

export class AnswerCallModule { }
