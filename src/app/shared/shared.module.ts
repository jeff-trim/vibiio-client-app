import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Services
import { WindowRefService } from '../services/window-ref.service';
import { VideoChatService } from './services/video-chat.service';
import { VideoChatTokenService } from './services/video-chat-token.service';
import { SidebarCustomerStatusSharedService } from './services/sidebar-customer-status-shared.service';
import { VibiioUpdateService } from './services/vibiio-update.service';
import { VideoSnapshotService } from './services/video-snapshot.service';
import { ActivityService } from './services/activity.service';
import { AvailabilitySharedService } from './services/availability-shared.service';
import { VideoChatComponent } from './components/video-chat/video-chat.component';
import { ClaimStatusComponent } from './components/claim-status/claim-status.component';

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { RemoveUnderscorePipe } from './pipes/remove-underscore.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    VideoChatComponent,
    ClaimStatusComponent,
    CapitalizePipe,
    OrderByPipe,
    RemoveUnderscorePipe
  ],
  providers: [
    WindowRefService,
    VideoChatService,
    VideoChatTokenService,
    SidebarCustomerStatusSharedService,
    VibiioUpdateService,
    VideoSnapshotService,
    ActivityService,
    AvailabilitySharedService
  ],
  exports: [
    VideoChatComponent,
    ClaimStatusComponent,
    CapitalizePipe,
    OrderByPipe,
    RemoveUnderscorePipe
  ]
})
export class SharedModule { }
