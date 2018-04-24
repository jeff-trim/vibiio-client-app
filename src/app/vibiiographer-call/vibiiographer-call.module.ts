import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VibiiographerCallComponent } from './vibiiographer-call.component';
import { WindowRefService } from '../services/window-ref.service';
import { VideoChatService } from '../dashboard/services/video-chat.service';
import { SidebarCustomerStatusSharedService } from '../dashboard/services/sidebar-customer-status-shared.service';
import { VibiioUpdateService } from '../dashboard/services/vibiio-update.service';
import { VideoSnapshotService } from '../dashboard/services/video-snapshot.service';
import { ActivityService } from '../dashboard/services/activity.service';
import { AvailabilitySharedService } from '../dashboard/services/availability-shared.service';
import { HttpModule } from '@angular/http';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    DashboardModule
  ],
  declarations: [
    VibiiographerCallComponent
  ],
  providers: [
    WindowRefService,
    VideoChatService,
    SidebarCustomerStatusSharedService,
    VibiioUpdateService,
    VideoSnapshotService,
    ActivityService,
    AvailabilitySharedService
  ]
})
export class VibiiographerCallModule { }
