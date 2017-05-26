import { Component, Input } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

import { ProfileInformationComponent } from '../components/profile-information/profile-information.component';
import { ProfileLicensureComponent } from '../components/profile-licensure/profile-licensure.component';
import { MyProfileService } from '../services/my-profile.service';

@Component({
  selector: 'my-profile',
  styleUrls: ['my-profile.component.scss'],
  templateUrl: 'my-profile.component.html'})

export class MyProfileComponent {
    profileData: any;

    constructor(private myProfileService: MyProfileService,
                private activatedRoute: ActivatedRoute){}

    ngOnInit(){
        this.activatedRoute.data.subscribe((data) => {
            this.profileData = data.myProfile
            console.log("data", data)
        })
    }
}
