import { Component } from '@angular/core'
import { MyProfileService } from '../../services/my-profile.service';
import { ProfileUrl } from '../../models/profile-url.interface';

@Component({
  selector: 'app-sidebar-profile',
  styleUrls: ['sidebar-profile.component.scss'],
  template: `<div>sidebar profile</div>`
})

export class SidebarProfileComponent {
  profile: ProfileUrl;
  constructor(private profileService: MyProfileService ) {}
  ngOnInit() {
    this.profileService
      .getMyProfile()
      .subscribe((data: ProfileUrl) => this.profile = data);
  }
}
