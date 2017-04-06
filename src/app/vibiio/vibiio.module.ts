import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { VibiioComponent } from './containers/vibiio.component';

// Services
import { VibiioResolver } from './services/vibiio.resolver.service';
import { VibiioService } from './services/vibiio.service';
import { VideoChatTokenService } from './services/video-chat-token.service';

// Routes
const vibiioRoutes: Routes = [
  {
    path: 'vibiios',
    component: VibiioComponent,
    resolve: { vibiio: VibiioResolver }
  }
];

@NgModule({
  declarations: [
    VibiioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(vibiioRoutes)
  ],
  exports: [
    VibiioComponent
  ],
  providers: [
    VibiioResolver,
    VibiioService,
    VideoChatTokenService
  ]
})

export class VibiioModule { };
