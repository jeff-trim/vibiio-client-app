import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Services
import { WindowRefService } from './services/window-ref.service';
import { VideoChatService } from './services/video-chat.service';
import { SidebarCustomerStatusSharedService } from './services/sidebar-customer-status-shared.service';
import { VibiioUpdateService } from './services/vibiio-update.service';
import { VideoSnapshotService } from './services/video-snapshot.service';
import { ActivityService } from './services/activity.service';
import { AvailabilitySharedService } from './services/availability-shared.service';
import { VideoChatComponent } from './components/video-chat/video-chat.component';
import { ClaimStatusComponent } from './components/claim-status/claim-status.component';
import { JcfModule } from '../../../node_modules/angular2-jcf-directive/jcfModule/jcf.module';
// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { RemoveUnderscorePipe } from './pipes/remove-underscore.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { VibiiosService } from './services/vibiios.service';
import { VibiiographerCallComponent } from './containers/vibiiographer-call/vibiiographer-call.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { VideoControlsComponent } from './components/video-controls/video-controls.component';
import { ExpertSearchComponent } from './containers/expert-search/expert-search.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ExpertSearchResultComponent } from './components/expert-search-result/expert-search-result.component';
import { UsersService } from './services/users.service';
import { VibiiographersResolverService } from './services/vibiiographers-resolver.service';
import { ExpertsResolverService } from './services/experts-resolver.service';
import { AddToCallService } from './services/add-to-call.service';
import { CallNameDisplayComponent } from './components/call-name-display/call-name-display.component';
import { SmNotificationComponent } from './components/sm-notification/sm-notification.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    JcfModule,
    AngularDraggableModule
  ],
  declarations: [
    VideoChatComponent,
    ClaimStatusComponent,
    CapitalizePipe,
    OrderByPipe,
    RemoveUnderscorePipe,
    VibiiographerCallComponent,
    VideoControlsComponent,
    ExpertSearchComponent,
    SearchFiltersComponent,
    SearchBoxComponent,
    ExpertSearchResultComponent,
    CallNameDisplayComponent,
    SmNotificationComponent
  ],
  providers: [
    WindowRefService,
    VideoChatService,
    SidebarCustomerStatusSharedService,
    VibiioUpdateService,
    VideoSnapshotService,
    ActivityService,
    AvailabilitySharedService,
    VibiiosService,
    UsersService,
    VibiiographersResolverService,
    ExpertsResolverService,
    AddToCallService
  ],
  exports: [
    VideoChatComponent,
    ClaimStatusComponent,
    CapitalizePipe,
    OrderByPipe,
    RemoveUnderscorePipe,
    VibiiographerCallComponent,
    VideoControlsComponent,
    SearchBoxComponent,
    ExpertSearchComponent,
    SearchFiltersComponent,
    ExpertSearchResultComponent,
    CallNameDisplayComponent
  ]
})
export class SharedModule { }
