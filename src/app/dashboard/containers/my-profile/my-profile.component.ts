import { Component, Input } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

//components
import { KeyValueComponent } from '../../components/key-value/key-value.component';
import { InsurancePolicyComponent } from  '../../components/insurance-policy/insurance-policy.component';
import { ProfileInformationComponent } from '../../components/profile-information/profile-information.component';
import { ProfileLicensureComponent } from '../../components/profile-licensure/profile-licensure.component';

// services
import { MyProfileService } from '../../services/my-profile.service';

@Component({
  selector: 'my-profile',
  styleUrls: ['my-profile.component.scss'],
  templateUrl: 'my-profile.component.html'})

export class MyProfileComponent {
    myProfile: any;

    constructor(private myProfileService: MyProfileService,
                private activatedRoute: ActivatedRoute){}

    ngOnInit(){
        this.activatedRoute.data.subscribe((data) => {
            this.myProfile = data.myProfile.user
            console.log(this.myProfile.user);
        })
    }
}
