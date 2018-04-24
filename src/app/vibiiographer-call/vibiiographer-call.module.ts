import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

// Custom Modules
import { SharedModule } from '../shared/shared.module';

// Componets
import { VibiiographerCallComponent } from './vibiiographer-call.component';

// Services
import { VibiiographerCallResolverService } from './services/vibiiographer-call-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    SharedModule
  ],
  declarations: [
    VibiiographerCallComponent
  ],
  providers: [
    VibiiographerCallResolverService
  ]
})
export class VibiiographerCallModule { }
